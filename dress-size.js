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


    var refreshTable = function(){
      var tbody = "";
      //  <tr id='sc-row-bust'><td>Bust</td><td>34 <small>in</small></td><td>36 <small>in</small></td><td>38 <small>in</small></td><td>40 <small>in</small></td></tr>
      for(var i=0; i<sizes.length;i++){
        tbody += '<tr  id="sc-row-'+sizes[i].bodypart+'"><td>'+sizes[i].bodypart+'</td>';
        for(var j=0; j<sizes[i][unit].length;j++)
          tbody += '<td>'+sizes[i][unit][j]+' <small>'+unitLabels[unit]+'</small></td>';
        tbody += ' </td></tr>';
      }

      sizeTableBody.html(tbody);
      $("#sc-row-waist").hover(function () { womanEmpty.hide(); womanWaist.show(); },
      function () { womanWaist.hide(); womanEmpty.show(); });
      $("#sc-row-bust").hover(function () { womanEmpty.hide(); womanBust.show();},
        function () { womanBust.hide(); womanEmpty.show(); });
      $("#sc-row-hips").hover(function () { womanEmpty.hide(); womanHips.show();},
        function () { womanHips.hide(); womanEmpty.show(); });
  
    };

    refreshTable();

    var currentSize = "";
    $("#sc-size-table-body td").click(function(e){
      $("#sc-size-table-body td").each(function(){
        $(this).removeClass("size-selected");
      });
      $(this).addClass("size-selected");
      e.stopPropagation();
    });

});