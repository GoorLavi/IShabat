const fs = require('fs');

fs.readFile("./events-copy.json", 'utf8', function readFileCallback(err, json) {
    if (err) {
        console.log(err);
    } else {

        const data = eval(json);
        const newData = data.map(({date, ...d}) => {
            const _date = new Date(date);
            _date.setDate(_date.getDate() - 1);

            return {date: _date.toISOString().slice(0, 10), ...d};
        });

        console.log("im here", newData)
        fs.writeFile("./events-copy.json", JSON.stringify(newData), 'utf8', err => {
            if (err) throw err;
            console.log('File has been saved!');
        });
    }
});
