const fs = require('fs');

fs.readFile("./events.json", 'utf8', function readFileCallback(err, json) {
    if (err) {
        console.log(err);
    } else {

        const data = eval(json);
        const newData = data.map(({_id, ...d}) => d);

        console.log("im here", newData)
        fs.writeFile("./events.json", JSON.stringify(newData), 'utf8', err => {
            if (err) throw err;
            console.log('File has been saved!');
        });
    }
});
