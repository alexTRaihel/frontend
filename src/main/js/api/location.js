const locations = [
    {
        "id" : 4,
        "name" : "Гродненская область",
        "latitude" : 53.67785,
        "longitude": 23.829484,
        "cities" : [
            {
                "name" : "Гродно",
                "id" : 4000
            },
            {
                "name" : "Лида",
                "id" : 4001
            }
        ]
    },
    {
        "id" : 5,
        "name" : "Минская область",
        "latitude" : 53.893009,
        "longitude": 27.567444,
        "cities" : [
            {
                "name" : "Минск",
                "id" : 5001
            }
        ]
    }
];

export default {
    getLocationInfo: (regionName, cityName) => {

        let regionId = 0;
        let cityId = 0;

        locations.forEach((item)=>{
            console.log(item);
            if (item.name == regionName){
                regionId = item.id;
                item.cities.forEach((item)=>{
                    if (item.name == cityName) {
                        cityId == item.id;
                    }
                });
            }
        });

        return {
            regionId: regionId,
            cityId: cityId
        }
    }
}