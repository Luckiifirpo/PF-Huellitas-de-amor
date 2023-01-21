const Pet_Pagination_Behavior = {

    Apply(petsData = [], itemsPerPage) {
        let input_data = [...petsData];
        const pages = Math.round(input_data.length / itemsPerPage);
        const page_chunks = [];

        while(input_data.length){
            if(input_data.length > itemsPerPage){
                page_chunks.push(input_data.splice(0, itemsPerPage));
            } else {
                page_chunks.push(input_data);
                input_data = [];
            }
        }

        return page_chunks;
    }
}

export default Pet_Pagination_Behavior;