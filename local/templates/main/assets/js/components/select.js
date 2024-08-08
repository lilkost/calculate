const createSelect = ()=> {
    $(document).ready(function() {
        $('.js-example-basic-single').select2({
            minimumResultsForSearch: -1
        });
    });
}

export default createSelect;