const Pet_Filters_Behavior = {
    Apply(petsData, filters) {
        let filtered_pets_data = petsData;

        switch (filters.genderFilter.index) {
            case 1:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.gender.toLowerCase() === "male"
                });
                break;
            case 2:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.gender.toLowerCase() === "female"
                });
                break;
        }

        switch (filters.speciesFilter.index) {
            case 1:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.species.toLowerCase() === "canine"
                });
                break;
            case 2:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return e.species.toLowerCase() === "feline"
                });
                break;
            case 3:
                filtered_pets_data = filtered_pets_data.filter(e => {
                    return (
                        e.species.toLowerCase() !== "canine" &&
                        e.species.toLowerCase() !== "feline"
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

            const age = e.ageTime === "years" ? e.age : (e.age / 10.0);
            const min = filters.ageFilter[0];
            const max = filters.ageFilter[1];

            if (age >= min && age <= max) {
                return e;
            }

        });

        filtered_pets_data = filtered_pets_data.filter(e => {
            const weight = e.weight;
            const min = filters.weightFilter[0];
            const max = filters.weightFilter[1];

            if (weight >= min && weight <= max) {
                return e;
            }
        });

        return filtered_pets_data;
    }
}

export default Pet_Filters_Behavior;