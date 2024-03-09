//@ts-ignore => someone fix this
import { fork, IPty } from 'node-pty';
import path from "path";

const SHELL = "bash";

export class TerminalManager {
    private sessions: { [id: string]: {terminal: IPty, assignmentId: string;} } = {};

    constructor() {
        this.sessions = {};
    }
    
    createPty(id: string, assignmentId: string, onData: (data: string, id: number) => void) {
        let term = fork(SHELL, [], {
            cols: 100,
            name: 'xterm',
            cwd: `/workspace`
        });
    
        term.on('data', (data: string) => onData(data, term.pid));
        this.sessions[id] = {
            terminal: term,
            assignmentId
        };
        term.on('exit', () => {
            delete this.sessions[term.pid];
        });
        return term;
    }

    write(terminalId: string, data: string) {
        this.sessions[terminalId]?.terminal.write(data);
    }

    clear(terminalId: string) {
        this.sessions[terminalId].terminal.kill();
        delete this.sessions[terminalId];
    }
}
