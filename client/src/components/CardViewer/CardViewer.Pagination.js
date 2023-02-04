const CardViewer_Pagination_Behavior = {

    Apply(cardType, cardsData = [], itemsPerPage) {
        let input_data = [...cardsData];

        if(cardType === "pet_card"){
            input_data = input_data.filter(card_data => {
                return !card_data.isAdopted;
            });
        }
        
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

export default CardViewer_Pagination_Behavior;