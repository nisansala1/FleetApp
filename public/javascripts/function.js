
let data;
function getassetdata(){
    var title = document.getElementById('title').value;
    //console.log(assetnumber);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/getdata/"+title,
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }

      

  
      
      $.ajax(settings).done(function (response) {
        data = response;
        if(data.length != []){
            let newtab = "";
            let serialno = 1;
            for(let i=(data.length)-1;i>0;i--){
                newtab = newtab + `<tr>
                <td> ` +serialno+`</td>
                <td> ` +data[i].title+`</td>
                <td> ` +data[i].latitude+`</td>
                <td> ` +data[i].longitude+`</td>
                <td> ` +moment(data[i].updatedate).format("MM/DD/YYYY h:mm:ss a")+`</td>
                <td> <button type="button" class="btn btn-primary" id="`+i+`" onclick="updatelocation(this.id)">View</button>
                </td></tr>`;
                serialno++;
            }
            
            $("table").find('tbody').html("");
            $("table").find("tbody").append(newtab);

            updatemap(data[(data.length)-1].latitude,data[(data.length)-1].longitude );
        
        }
        else{
            console.log("no data found");
        }
        //console.log(response);
      });
}


  

  


  