sidemenu=[
    {
        id:1,
        name:"Recommended",
    },
    {
        id:2,
        name:"Premium Thali",
    },
    {
        id:3,
        name:"Starters",
    },
    {
        id:4,
        name:"Platter",
    },
    {
        id:5,
        name:"Family Binge Pack",
    },
    {
        id:6,
        name:"Main Course",
    },
    {
        id:7,
        name:"Rice and Indian Breads",
    },
    {
        id:8,
        name:"Desserts and Beverages",
    },
    {
        id:9,
        name:"Accompaniments",
    }
];

var html='';

for(var i=0;i<sidemenu.length;i++)
{
    html+="<li>";
    html+="<span>"+sidemenu[i].name+"</span>";
    html+="</li>";
}

document.querySelector(".categories").innerHTML=html;


