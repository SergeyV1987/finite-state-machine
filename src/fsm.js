class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw Error();
        this.config = config;
        this.initialState = config.initial;
        this.state = this.initialState;
        this.states = config.states;
        this.history = [];
        this.altHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.history.push(this.state);
        this.altHistory = [];
        switch (state) {
            case "normal":
                this.state = "normal";
                break;
            case "busy":
                this.state = "busy";
                break;
            case "hungry":
                this.state = "hungry";
                break;
            case "sleeping":
                this.state = "sleeping";
                break;
            default:
                throw Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        switch (event) {
            case "study":
                if (this.state === "normal") {
                    this.changeState("busy");
                } else { throw Error()}
                break;
            case "get_tired":
                if (this.state === "busy") {
                    this.changeState("sleeping")
                } else { throw Error()}
                break;
            case "get_hungry":
                if (this.state === "busy" || this.state === "sleeping") {
                    this.changeState("hungry")
                } else { throw Error()}
                break;
            case "eat":
                if (this.state === "hungry") {
                    this.changeState("normal")
                } else { throw Error()}
                break;
            case "get_up":
                if (this.state === "sleeping") {
                    this.changeState("normal")
                } else { throw Error()}
                break;
            default:
                throw Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initialState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        const allStates = Object.keys(this.states);
        let possibleStates = [];

        switch(event) {
            case "study":
                return possibleStates = ['normal'];
            case "get_tired":
                return possibleStates = ['busy'];
            case "get_hungry":
                return possibleStates = ['busy', 'sleeping'];
            case "eat":
                return possibleStates = ['hungry'];
            case "get_up":
                return possibleStates = ['sleeping'];
            case undefined:
                return allStates;
            default:
                return possibleStates;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length === 0) return false;
        let popped = this.history.pop();
        this.altHistory.push(this.state);
        this.state = popped;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.altHistory.length === 0) return false;
        this.state = this.altHistory.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
