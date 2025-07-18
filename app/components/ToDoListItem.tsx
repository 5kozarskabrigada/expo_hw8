import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Todo } from '../context/ToDoContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    todo: Todo
    onToggle: (id: string) => void
    showDivider?: boolean 
}

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const categoryStyles: Record<string, { icon: IconName; bgColor: string; textColor: string }> = {
    task: {
        icon: 'document-text-outline',
        bgColor: '#E0F0FF',
        textColor: '#3D7EFF'
    },
    event: {
        icon: 'calendar-outline',
        bgColor: '#E9E5FF',
        textColor: '#6C4ED9'
    },
    goal: {
        icon: 'trophy-outline',
        bgColor: '#FFF7DD',
        textColor: '#FFB800'
    }
}

export default function TodoListItem({ todo, onToggle, showDivider = true }: Props) {
    const cat = categoryStyles[todo.category] ?? categoryStyles['task'];

    return (
        <View style={styles.listItemContainer}>
            <View style={[styles.container, showDivider && styles.divider]}>
                <View style={styles.leftSection}>
                    <View style={[styles.icon, { backgroundColor: cat.bgColor }]}>
                        <Ionicons name={cat.icon} size={20} color={cat.textColor} />
                    </View>
                    <View style={styles.text}>
                        <Text
                            style={[
                                styles.title,
                                todo.completed && { textDecorationLine: 'line-through', color: '#999' }
                            ]}
                        >
                            {todo.text}
                        </Text>
                        <Text
                            style={[
                                styles.time,
                                todo.completed && { textDecorationLine: 'line-through', color: '#999' }
                            ]}
                        >
                            {todo.time}
                        </Text>
                    </View>
                </View>
                <Checkbox
                    value={todo.completed}
                    onValueChange={() => onToggle(todo.id)}
                    color={todo.completed ? '#4A3780' : undefined}
                    style={styles.checkbox}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        paddingHorizontal: 16, // Match your design width
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 16,
        width: '100%',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    text: { flex: 1 },
    title: { fontSize: 16, fontWeight: '600', color: '#333' },
    time: { fontSize: 14, color: '#666', marginTop: 4 },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#4A3780'
    }
})