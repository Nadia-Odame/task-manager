/**
 * TaskFlow - Task Management Application
 * 
 * This application demonstrates fundamental web development concepts:
 * - DOM Manipulation
 * - Event Handling
 * - Local Storage API
 * - Dynamic UI Updates
 * - Responsive Filtering
 * 
 * Author: Web Infrastructure Project
 * Date: 2026
 */

// ===================================
// STATE MANAGEMENT
// ===================================

let tasks = [];
let currentFilter = 'all';

// ===================================
// DOM ELEMENTS
// ===================================

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const filterTabs = document.querySelectorAll('.filter-tab');
const clearCompletedBtn = document.getElementById('clear-completed');
const actionBar = document.getElementById('action-bar');
const toast = document.getElementById('toast');

// Stats elements
const totalTasksEl = document.getElementById('total-tasks');
const activeTasksEl = document.getElementById('active-tasks');
const completedTasksEl = document.getElementById('completed-tasks');

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize the application when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    renderTasks();
    updateStats();
    attachEventListeners();
});

// ===================================
// EVENT LISTENERS
// ===================================

/**
 * Attach all event listeners to DOM elements
 */
function attachEventListeners() {
    // Form submission
    taskForm.addEventListener('submit', handleAddTask);
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', handleFilterChange);
    });
    
    // Clear completed button
    clearCompletedBtn.addEventListener('click', handleClearCompleted);
}

// ===================================
// TASK OPERATIONS
// ===================================

/**
 * Handle adding a new task
 * @param {Event} e - Form submit event
 */
function handleAddTask(e) {
    e.preventDefault();
    
    const taskText = taskInput.value.trim();
    
    // Validation
    if (!taskText) {
        showToast('Please enter a task description', 'error');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: generateUniqueId(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };
    
    // Add to tasks array
    tasks.unshift(newTask); // Add to beginning for newest-first order
    
    // Save to localStorage
    saveTasksToStorage();
    
    // Update UI
    renderTasks();
    updateStats();
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
    
    // Show success message
    showToast('Task added successfully! ✓');
}

/**
 * Toggle task completion status
 * @param {string} taskId - Unique task identifier
 */
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        
        saveTasksToStorage();
        renderTasks();
        updateStats();
        
        const message = task.completed ? 'Task completed! 🎉' : 'Task marked as active';
        showToast(message);
    }
}

/**
 * Delete a specific task
 * @param {string} taskId - Unique task identifier
 */
function deleteTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        // Remove task from array
        tasks = tasks.filter(t => t.id !== taskId);
        
        saveTasksToStorage();
        renderTasks();
        updateStats();
        
        showToast('Task deleted');
    }
}

/**
 * Clear all completed tasks
 */
function handleClearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        showToast('No completed tasks to clear');
        return;
    }
    
    // Remove completed tasks
    tasks = tasks.filter(t => !t.completed);
    
    saveTasksToStorage();
    renderTasks();
    updateStats();
    
    showToast(`${completedCount} completed task${completedCount > 1 ? 's' : ''} cleared`);
}

// ===================================
// FILTERING
// ===================================

/**
 * Handle filter tab changes
 * @param {Event} e - Click event
 */
function handleFilterChange(e) {
    const filter = e.target.dataset.filter;
    
    // Update active filter
    currentFilter = filter;
    
    // Update tab UI
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-pressed', 'false');
    });
    
    e.target.classList.add('active');
    e.target.setAttribute('aria-pressed', 'true');
    
    // Re-render tasks with new filter
    renderTasks();
}

/**
 * Get filtered tasks based on current filter
 * @returns {Array} Filtered tasks array
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

// ===================================
// RENDERING
// ===================================

/**
 * Render all tasks to the DOM
 */
function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    // Clear current task list
    taskList.innerHTML = '';
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
        taskList.classList.add('hidden');
        actionBar.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        taskList.classList.remove('hidden');
        
        // Show action bar only if there are completed tasks
        const hasCompletedTasks = tasks.some(t => t.completed);
        if (hasCompletedTasks) {
            actionBar.classList.remove('hidden');
        } else {
            actionBar.classList.add('hidden');
        }
        
        // Render each task
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }
}

/**
 * Create a task DOM element
 * @param {Object} task - Task object
 * @returns {HTMLElement} Task list item element
 */
function createTaskElement(task) {
    // Create list item
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('role', 'listitem');
    li.dataset.taskId = task.id;
    
    // Create checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    checkbox.setAttribute('role', 'checkbox');
    checkbox.setAttribute('aria-checked', task.completed);
    checkbox.setAttribute('tabindex', '0');
    checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));
    checkbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTaskCompletion(task.id);
        }
    });
    
    // Create task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    // Create timestamp
    const timestamp = document.createElement('span');
    timestamp.className = 'task-timestamp';
    timestamp.textContent = formatDate(task.createdAt);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.innerHTML = '✕';
    deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    // Assemble task item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(timestamp);
    li.appendChild(deleteBtn);
    
    return li;
}

/**
 * Update statistics display
 */
function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    
    // Animate number changes
    animateValue(totalTasksEl, parseInt(totalTasksEl.textContent) || 0, total, 300);
    animateValue(activeTasksEl, parseInt(activeTasksEl.textContent) || 0, active, 300);
    animateValue(completedTasksEl, parseInt(completedTasksEl.textContent) || 0, completed, 300);
}

// ===================================
// LOCAL STORAGE OPERATIONS
// ===================================

/**
 * Save tasks to localStorage
 */
function saveTasksToStorage() {
    try {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showToast('Error saving tasks', 'error');
    }
}

/**
 * Load tasks from localStorage
 */
function loadTasksFromStorage() {
    try {
        const storedTasks = localStorage.getItem('taskflow_tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        tasks = [];
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Generate a unique ID for tasks
 * @returns {string} Unique identifier
 */
function generateUniqueId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format ISO date string to readable format
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // Less than a minute
    if (diffInSeconds < 60) {
        return 'Just now';
    }
    
    // Less than an hour
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`;
    }
    
    // Less than a day
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
    }
    
    // Less than a week
    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`;
    }
    
    // Format as date
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, error)
 */
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.classList.add('show');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Animate a number change
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 */
function animateValue(element, start, end, duration) {
    if (start === end) return;
    
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = Math.round(current);
    }, 16);
}

// ===================================
// KEYBOARD SHORTCUTS (BONUS FEATURE)
// ===================================

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Focus input when pressing '/' key
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement !== taskInput) {
            e.preventDefault();
            taskInput.focus();
        }
    }
    
    // Clear completed tasks with Ctrl/Cmd + Shift + C
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'c') {
        e.preventDefault();
        handleClearCompleted();
    }
});

// ===================================
// EXPORT (for testing purposes)
// ===================================

// Make functions available globally for potential testing
if (typeof window !== 'undefined') {
    window.TaskFlowApp = {
        tasks,
        addTask: handleAddTask,
        deleteTask,
        toggleTask: toggleTaskCompletion,
        clearCompleted: handleClearCompleted
    };
}