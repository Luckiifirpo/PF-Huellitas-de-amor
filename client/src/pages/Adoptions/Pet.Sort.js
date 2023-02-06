const Pet_Sort_Behavior = {
    Apply(petsData = [], sortMethodIndex, sortDirection) {
        let output_data = petsData;

        switch (sortMethodIndex) {
            case 0:
                output_data = output_data.sort((a, b) => {
                    const sizeA = a.size.toLowerCase();
                    const sizeB = b.size.toLowerCase();

                    switch (sortDirection) {
                        case "Ascending":
                            if (sizeA < sizeB) {
                                return -1;
                            }
                            if (sizeA > sizeB) {
                                return 1;
                            }
                            return 0;
                        case "Descending":
                            if (sizeA < sizeB) {
                                return 1;
                            }
                            if (sizeA > sizeB) {
                                return -1;
                            }
                            return 0;
                    }
                });
                break;
            case 1:
                output_data = output_data.sort((a, b) => {
                    const ageA = a.ageTime === "years" ? a.age : (a.age / 10.0);
                    const ageB = b.ageTime === "years" ? b.age : (b.age / 10.0);

                    switch (sortDirection) {
                        case "Ascending":
                            if (ageA < ageB) {
                                return -1;
                            }
                            if (ageA > ageB) {
                                return 1;
                            }
                            return 0;
                        case "Descending":
                            if (ageA < ageB) {
                                return 1;
                            }
                            if (ageA > ageB) {
                                return -1;
                            }
                            return 0;
                    }
                });
                break;
            case 2:
                output_data = output_data.sort((a, b) => {
                    const weightA = a.weight;
                    const weightB = b.weight;

                    switch (sortDirection) {
                        case "Ascending":
                            if (weightA < weightB) {
                                return -1;
                            }
                            if (weightA > weightB) {
                                return 1;
                            }
                            return 0;
                        case "Descending":
                            if (weightA < weightB) {
                                return 1;
                            }
                            if (weightA > weightB) {
                                return -1;
                            }
                            return 0;
                    }
                });
                break;
        }

        return output_data;
    }
}

const parseAgeData = (value) => {
    const age_data = value.toLowerCase();
    let age_str_number = "";
    let age_number;
    let age_step = "";
    let years = true;

    for (let it = 0; it < age_data.length; it++) {
        const char = age_data[it];
        if (/[\d]/.test(char)) {
            age_str_number += char;
        } else if (/[a-zA-Z]/.test(char)) {
            age_step += char;
        }
    }

    age_number = parseInt(age_str_number);
    years = /(year|yr)/.test(age_step);

    if (!years) {
        return age_number / 10;
    } else {
        return age_number
    }
}

const parseWeightData = (value) => {
    const weight_data = value.toLowerCase();
    let weight_str_number = "";
    let weight_number;
    let weight_step = "";
    let kilograms = true;

    for (let it = 0; it < weight_data.length; it++) {
        const char = weight_data[it];
        if (/[\d]/.test(char)) {
            weight_str_number += char;
        } else if (/[a-zA-Z]/.test(char)) {
            weight_step += char;
        }
    }

    weight_number = parseInt(weight_str_number);
    kilograms = /(kilo|kilogram|kg)/.test(weight_step);

    if (!kilograms) {
        return weight_number / 10;
    } else {
        return weight_number;
    }
}

export default Pet_Sort_Behavior;