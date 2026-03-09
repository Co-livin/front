export const store = {

    user: null,
    spaces: [],
    tasks: [],
    events: [],

    setUser(user) {
        this.user = user
    },

    setSpaces(spaces) {
        this.spaces = spaces
    },

    setTasks(tasks) {
        this.tasks = tasks
    },

    setEvents(events) {
        this.events = events
    },

}