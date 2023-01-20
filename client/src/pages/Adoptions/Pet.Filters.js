const Pet_Filters_Behavior = {
    Apply(petsData, filters) {
        let filtered_pets_data = petsData;

        switch (filters.genreFilter.index) {
            case 1:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.genre.toLowerCase() === "male"
                });
                break;
            case 2:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.genre.toLowerCase() === "female"
                });
                break;
        }

        switch (filters.speciesFilter.index) {
            case 1:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.species.toLowerCase() === "dog"
                });
                break;
            case 2:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.species.toLowerCase() === "cat"
                });
                break;
            case 3:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return (
                        e.species.toLowerCase() === "dog" &&
                        e.species.toLowerCase() === "cat"
                    )
                });
                break;
        }

        switch (filters.sizeFilter.index) {
            case 1:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.size.toLowerCase() === "small"
                });
                break;
            case 2:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.size.toLowerCase() === "medium"
                });
                break;
            case 3:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.size.toLowerCase() === "big"
                });
                break;
        }

        filtered_pets_data = filtered_pets_data.filter(e => {
            const age_data = e.age.toLowerCase();
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
                if (filters.ageFilter[0] === 0) {
                    return e;
                }
            } else {
                const min = filters.ageFilter[0];
                const max = filters.ageFilter[1];

                if (age_number >= min && age_number <= max) {
                    return e;
                }
            }
        });

        filtered_pets_data = filtered_pets_data.filter(e => {
            const weight_data = e.weight.toLowerCase();
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
                if (filters.weightFilter[0] === 0) {
                    return e;
                }
            } else {
                const min = filters.weightFilter[0];
                const max = filters.weightFilter[1];

                if (weight_number >= min && weight_number <= max) {
                    return e;
                }
            }
        });

        return filtered_pets_data;
    }
}

export default Pet_Filters_Behavior;