const fs = require('fs');
const os = require('os');
const yargs = require('yargs')

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

let argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv



let command = argv._[0]

// console.log(argv)

if(command == 'add'){
    let note = notes.addNote(argv.title, argv.body)
    if(note) {
        console.log('Note Added!')
        notes.logNote(note)
    } else {
        console.log("Note title taken")
    }
} else if(command == 'list'){
    let allNotes = notes.getAll()
    console.log(`Printing ${allNotes.length} notes.`)
    allNotes.forEach((note) => notes.logNote(note))
} else if (command == 'read') {
    let note = notes.getNote(argv.title)
    if(note) {
        console.log('Note Found!')
        notes.logNote(note)
    } else {
        console.log("Note title not found")
    }
} else if (command == 'remove') {
    let noteRemoved = notes.removeNote(argv.title)
    let message = noteRemoved ? 'Note was Removed' : 'Note note found'
    console.log(message)
} else {
    console.log("Command not recognized")
}
