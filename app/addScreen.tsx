import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { useTodos, Category } from './context/ToDoContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddScreen() {
    const { addTodo } = useTodos()
    const router = useRouter()

    const [text, setText] = useState('')
    const [category, setCategory] = useState<Category>('task')
    const [date, setDate] = useState(new Date())
    const [notes, setNotes] = useState('')
    const [time, setTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const save = () => {
        if (!text.trim()) return;

        const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const dateString = date.toLocaleDateString()

        addTodo(
            text,
            category,
            timeString,
            dateString,
            notes
        )
        router.back()
    }

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false)
        if (selectedDate) {
            setDate(selectedDate)
        }
    }

    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false)
        if (selectedTime) {
            setTime(selectedTime)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="close-circle" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Task</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Task Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter task title"
                    value={text}
                    onChangeText={setText}
                />

                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryOptions}>
                    <TouchableOpacity
                        style={[
                            styles.categoryOption,
                            category === 'task' && styles.categoryOptionSelected,
                            { backgroundColor: '#E0F0FF' }
                        ]}
                        onPress={() => setCategory('task')}
                    >
                        <Ionicons name="document-text-outline" size={20} color="#3D7EFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryOption,
                            category === 'event' && styles.categoryOptionSelected,
                            { backgroundColor: '#E9E5FF' }
                        ]}
                        onPress={() => setCategory('event')}
                    >
                        <Ionicons name="calendar-outline" size={20} color="#6C4ED9" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[
                            styles.categoryOption,
                            category === 'goal' && styles.categoryOptionSelected,
                            { backgroundColor: '#FFF7DD' }
                        ]}
                        onPress={() => setCategory('goal')}
                    >
                        <Ionicons name="trophy-outline" size={20} color="#FFB800" />
                    </TouchableOpacity>
                </View>


                <Text style={styles.label}>Date & Time</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.dateTimeButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.dateTimeText}>Date: {date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dateTimeButton}
                        onPress={() => setShowTimePicker(true)}
                    >

                        <Text style={styles.dateTimeText}>Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                </View>


                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        onChange={onDateChange}
                    />
                )}
                {showTimePicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        onChange={onTimeChange}
                    />
                )}

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Add any notes here..."
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={save}>
                <Text style={styles.saveButtonText}>Save</Text>
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
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    backButton: {
        position: 'absolute',
        left: 20,
        fontSize: 15,
    },
    backText: {
        color: 'white',
        fontSize: 24,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    form: {
        padding: 20,
        flex: 1
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: 'white'
    },
    notesInput: {
        height: 170,
        textAlignVertical: 'top'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    dateTimeButton: {
        flex: 0.48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    dateTimeText: {
        fontSize: 14,
        color: '#333'
    },
    categoryOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    categoryOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryOptionSelected: {
        borderWidth: 2,
        borderColor: '#4A3780'
    },
    saveButton: {
        backgroundColor: '#4A3780',
        padding: 18,
        margin: 20,
        borderRadius: 40,
        alignItems: 'center'
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    }
})