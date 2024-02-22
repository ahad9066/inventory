import { FeTiProduct } from "../schema/interfaces/products.interface";

export const ParseProducts = (productList: FeTiProduct[], sizeChart) => {
    const newArr = [];
    for (const key in sizeChart) {
        const value = sizeChart[key];
        let obj = {
            id: value.code,
            name: value.name,
        };
        let grades = []
    }
}
export const groupBySizes = (jsonArray) => {
    const groupedData = {};

    // Iterate over each item in the JSON array
    jsonArray.forEach(item => {
        const subGrades = item.subGrades;

        // Iterate over each subGrade of the current item
        subGrades.forEach(subGrade => {
            const sizes = subGrade.sizes;

            // Iterate over each size of the current subGrade
            sizes.forEach(size => {
                // Check if the size already exists in the grouped data
                if (!groupedData[size.name]) {
                    // If not, initialize an array for that size
                    groupedData[size.name] = [];
                }

                // Push the current item to the array for the corresponding size
                groupedData[size.name].push({
                    id: item.id,
                    name: item.name,
                    subGradeId: subGrade.id,
                    subGradeName: subGrade.name,
                    price: subGrade.price,
                    stockCount: size.stockCount
                });
            });
        });
    });

    return groupedData;
}

export const groupBySizesAndName = (jsonArray) => {
    const groupedData = {};

    // Iterate over each item in the JSON array
    jsonArray.forEach(item => {
        const subGrades = item.subGrades;

        // Iterate over each subGrade of the current item
        subGrades.forEach(subGrade => {
            const sizes = subGrade.sizes;

            // Iterate over each size of the current subGrade
            sizes.forEach(size => {
                // Check if the size already exists in the grouped data
                if (!groupedData[size.id]) {
                    // If not, initialize an object for that size
                    groupedData[size.id] = {};
                }

                // Check if the name already exists in the grouped data for this size
                if (!groupedData[size.id][item.id]) {
                    // If not, initialize an array for that name
                    groupedData[size.id][item.id] = [];
                }

                // Push the current item to the array for the corresponding size and name
                groupedData[size.id][item.id].push({
                    id: item.id,
                    name: item.name,
                    subGradeId: subGrade.id,
                    subGradeName: subGrade.name,
                    price: subGrade.price,
                    stockCount: size.stockCount,
                    holdCount: size.holdCount
                });
            });
        });
    });

    const groupedArray = Object.entries(groupedData).map(([key, value]) => ({
        key,
        value: Object.entries(value).map(([subKey, subValue]) => ({
            subKey,
            subValue
        }))
    }));
    return groupedArray;
}





