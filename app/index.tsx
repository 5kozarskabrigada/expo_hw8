import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useTodos } from './context/ToDoContext';
import TodoListItem from './components/ToDoListItem';
import { useRouter } from 'expo-router';

export default function Home() {
    const { todos, toggleTodo } = useTodos()
    const router = useRouter()

    const active = todos.filter(t => !t.completed)
    const completed = todos.filter(t => t.completed)

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.date}>{today}</Text>
                <Text style={styles.title}>My Todo List</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.tasksContainer}>
                    <FlatList
                        data={active}
                        keyExtractor={t => t.id}
                        renderItem={({ item, index }) => (
                            <TodoListItem
                                todo={item}
                                onToggle={toggleTodo}
                                showDivider={index !== active.length - 1}
                            />
                        )}
                    />
                </View>

                {completed.length > 0 && (
                    <View style={styles.completedContainer}>
                        <Text style={styles.sectionTitle}>Completed</Text>
                        <View style={styles.tasksContainer}>
                            <FlatList
                                data={completed}
                                keyExtractor={t => t.id}
                                renderItem={({ item }) => (
                                    <TodoListItem
                                        todo={item}
                                        onToggle={toggleTodo}
                                        showDivider={false} 
                                    />
                                )}
                            />
                        </View>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/addScreen')}
            >
                <Text style={styles.addButtonText}>Add New Task</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F6'
    },
    header: {
        backgroundColor: '#4A3780',
        height: 222,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: -10,
    },
    date: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        marginBottom: 40,
        marginTop: -70,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingHorizontal: 0,
        marginTop: -45
    },
    tasksContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
    },

    completedContainer: {
        marginTop: 16
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
        paddingHorizontal: 16
    },
    addButton: {
        backgroundColor: '#4A3780',
        padding: 18,
        margin: 20,
        borderRadius: 40,
        alignItems: 'center'
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    }
})