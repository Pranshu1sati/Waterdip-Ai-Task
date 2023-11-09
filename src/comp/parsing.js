// const fs = require('fs');
// const Papa = require('papaparse');


// const csvFilePath = fs("./hotel_booking_1000(3)");
// fs.readFile(csvFilePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading CSV file:', err);
//         return;
//     }


//     Papa.parse(data, {
//         header: true,
//         complete: (result) => {
//             const jsonData = result.data;

//             // Output the result
//             console.log(JSON.stringify(jsonData, null, 2));
//         },
//         error: (error) => {
//             console.error('Error parsing CSV:', error.message);
//         }
//     });
// });
