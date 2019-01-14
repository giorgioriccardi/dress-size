jQuery(document).ready(function($) {
    console.log("ready!");

    var sizes = [
      {"bodypart": "bust", "IN":[34,36,38,40], "CM": [86,91,96,102]},
      {"bodypart": "waist", "IN":[26,28,30,32], "CM": [66,71,76,81]},
      {"bodypart": "hips", "IN":[36.5,38.5,40.5, 42.5], "CM": [93,98,104,108]}
    ];

    var womanEmpty = $("#sc-woman-empty");
    var womanWaist = $("#sc-woman-waist");
    var womanBust = $("#sc-woman-bust");
    var womanHips = $("#sc-woman-hips");
    var sizeTableBody  = $("#sc-size-table-body");

    var unit = "IN";
    var unitLabels = {"IN":"in", "CM": "cm"};



    var unitToggle = $("#sc-unit-toggle");

    unitToggle.change(function() {
      console.log("c",this.checked);
      unit = this.checked?"CM":"IN";
      refreshTable();
    });

    var selectedSizeCell = null;
    var selectedImage = womanEmpty;
    var data_th = ['XS','S','M','L'];
    var refreshTable = function(){
      var tbody = "";
      for(var i=0; i<sizes.length;i++){
        tbody += '<tr  id="sc-row-'+sizes[i].bodypart+'"><td class="sc-bodypart-cell">'+sizes[i].bodypart+'</td>';
        for(var j=0; j<sizes[i][unit].length;j++)
          tbody += '<td data-th="'+data_th[j]+'" id="sc_cell_'+i+'_'+j+'">'+sizes[i][unit][j]+'</td>';
        tbody += ' </td></tr>';
      }

      sizeTableBody.html(tbody);
      $("#sc-row-waist").hover(function () {  selectedImage.hide(); womanWaist.show(); },
      function () { womanWaist.hide(); selectedImage.show(); });
      $("#sc-row-bust").hover(function () {  selectedImage.hide(); womanBust.show();},
        function () { womanBust.hide(); selectedImage.show(); });
      $("#sc-row-hips").hover(function () { selectedImage.hide(); womanHips.show();},
        function () { womanHips.hide();  selectedImage.show(); });

        $("#sc-size-table-body td").click(function(e){
          $("#sc-size-table-body td").each(function(){
            $(this).removeClass("size-selected");
          });
          $(this).addClass("size-selected");
          selectedSizeCell = $(this).attr("id");
    
          if(selectedSizeCell.startsWith("sc_cell_0"))
            selectedImage = womanBust;
          else if(selectedSizeCell.startsWith("sc_cell_1"))
            selectedImage = womanWaist;
          else if(selectedSizeCell.startsWith("sc_cell_2"))
            selectedImage = womanHips;
          else
          selectedImage = womanEmpty;
    
          e.stopPropagation();
        });
    
      if(selectedSizeCell!=null)
       $("#"+selectedSizeCell).addClass("size-selected");

    };

    refreshTable();

    var currentSize = "";
});