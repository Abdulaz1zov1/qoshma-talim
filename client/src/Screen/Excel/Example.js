const borders = {
    top: {style: "thin"},
    bottom: {style: "thin"},
    left: {style: "thin"},
    right: {style: "thin"}
};
export const excelDataSet = (data, dataS, columns) => {
    let setColumns = [];
    columns.map(i =>
        setColumns.push(
            {title: i, style: {border: borders, font: {sz: "14", bold: true}}, width: {wpx: 150}}, // width in pixels
        )
    );
    let sData = [];
    data.map(j => {
            let ssData = [];
            dataS.map(i => {
                    if (i === "storesId") {
                        ssData.push(
                            {
                                value: j[i] || j[i] === false ? JSON.stringify(j[i]).substring(1,JSON.stringify(j[i]).length - 1) : "(пусто)",
                                style: {border: borders, font: {bold: false}}
                            },
                        )
                    } else {
                        ssData.push(
                            {value: j[i] || j[i] === false ? j[i] : "(пусто)", style: {border: borders, font: {bold: false}}},
                        )
                    }
                },
                sData.push(ssData)
            )
        }
    );
    return [
        {
            columns: setColumns,
            data: sData
        }
    ]
};