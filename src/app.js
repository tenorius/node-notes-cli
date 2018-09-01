const yargs = require('yargs');

const notes = require('./notes');

console.log('Starting application...');
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b',
};
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List all notes')
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv;
const command = process.argv[2];


if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'read') {
  let note = notes.readNote(argv.title);
  if (note) {
    console.log('Note Found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  let removed = notes.removeNote(argv.title);
  if (removed) {
    console.log('Note removed');
    console.log('----');
    console.log(`Title: ${argv.title}`);
  } else {
    console.log('Note not found');
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else {
  console.log('Command not recognized');
}
