<template>
    <div>
        <div id="header">
            <input :disabled="disabled" ref="suggest" :class="{'input_error' : input_error}" type="text" id="suggest" class="input" placeholder="Введите адрес">
            <button :disabled="disabled" type="submit" id="button" @click="geocode">Проверить</button>
        </div>
        <p v-show="show_notice" id="notice">{{notice_message}}}</p>
        <div id="mapsearch" ref="mapref"></div>
        <div id="footer" v-if="messageHeader">
            <div id="messageHeader">{{messageHeader}}</div>
            <div id="message">{{message}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchByAddressForm",
        props: ["updateCoordinates","disabled"],
        data() {
            return{
                input_error: false,
                notice_message: 'Адрес не найден',
                show_notice: false,
                messageHeader: null,
                message: null,
                map: null,
                placemark: null,
                suggestView: null
            }
        },
        created(){
            ymaps.ready(this.init);
        },
        beforeDestroy(){
            if (this.map) {
                this.map.destroy();
                this.map = null;
            }
        },
        methods: {
            init(){
                this.suggestView = new ymaps.SuggestView('suggest');
            },

            geocode(){

                let that = this;
                let request = this.$refs.suggest.value;

                ymaps.geocode(request).then(function (res) {
                    var obj = res.geoObjects.get(0),
                        error, hint;

                    if (obj) {
                        // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
                        switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                            case 'exact':
                                break;
                            case 'number':
                            case 'near':
                            case 'range':
                                error = 'Неточный адрес, требуется уточнение';
                                hint = 'Уточните номер дома';
                                break;
                            case 'street':
                                error = 'Неполный адрес, требуется уточнение';
                                hint = 'Уточните номер дома';
                                break;
                            case 'other':
                            default:
                                error = 'Неточный адрес, требуется уточнение';
                                hint = 'Уточните адрес';
                        }
                    } else {
                        error = 'Адрес не найден';
                        hint = 'Уточните адрес';
                    }

                    // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
                    if (error) {
                        that.showError(error);
                        that.showMessage(hint);
                    } else {
                        that.showResult(obj);
                    }
                }, function (e) {
                    console.log(e)
                })
            },
            showResult(obj) {
                // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
                this.input_error = false;
                this.show_notice = false;

                var mapContainer = this.$refs.mapref,
                    bounds = obj.properties.get('boundedBy'),
                    // Рассчитываем видимую область для текущего положения пользователя.
                    mapState = ymaps.util.bounds.getCenterAndZoom(
                        bounds,
                        [mapContainer.offsetWidth, mapContainer.offsetHeight]
                    ),
                    // Сохраняем полный адрес для сообщения под картой.
                    address = [obj.getCountry(), obj.getAddressLine()].join(', '),
                    // Сохраняем укороченный адрес для подписи метки.
                    shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
                // Убираем контролы с карты.
                mapState.controls = [];

                let objectInfo = {
                    coordinates: mapState.center,
                    administrativeArea: obj.getAdministrativeAreas() ? obj.getAdministrativeAreas()[0] : null,
                    locality: obj.getLocalities() ? obj.getLocalities()[0] : null,
                    addressLine: obj.getAddressLine()
                };

                this.updateCoordinates(objectInfo);
                this.createMap(mapState, shortAddress);
                this.showMessage(address);
            },

            showError(message) {

                this.notice_message = message;
                this.show_notice = true;
                this.input_error = true;

                if (this.map) {
                    this.map.destroy();
                    this.map = null;
                }
            },

            createMap(state, caption) {

                let that = this;

                if (!this.map) {
                    this.map = new ymaps.Map('mapsearch', state);
                    this.placemark = new ymaps.Placemark(
                        that.map.getCenter(), {
                            iconCaption: caption,
                            balloonContent: caption
                        }, {
                            preset: 'islands#redDotIconWithCaption'
                        });
                    this.map.geoObjects.add(this.placemark);
                } else {
                    this.map.setCenter(state.center, state.zoom);
                    this.placemark.geometry.setCoordinates(state.center);
                    this.placemark.properties.set({iconCaption: caption, balloonContent: caption});
                }
            },

            showMessage(message) {
                this.messageHeader = 'Данные получены:',
                this.message = message;
            }
        }
    }
</script>

<style scoped>
    html, body {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        font-size: 13px;
        font-family: sans-serif;
        overflow: hidden;
    }

    #notice{
        display: block;
    }

    #messageHeader {
        height: 20px;
    }

    #footer {
        width: 376px;
        background-color: #f2f2ef;
        padding: 12px;
    }

    #message {
        height: 40px;
    }

    #mapsearch {
        height: 160px;
        width: 376px;
        margin: 0px 12px 18px 12px;
        position: relative;
    }

    #header {
        height: 28px;
        width: 376px;
        margin: 12px 10px 12px 12px;
    }

    #button {
        display: inline-block;
        font-size: 11px;
        color: rgb(68,68,68);
        text-decoration: none;
        user-select: none;
        padding: .2em 0.6em;
        outline: none;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 2px;
        background: rgb(245,245,245) linear-gradient(#f4f4f4, #f1f1f1);
        transition: all .218s ease 0s;
        height: 28px;
        width: 74px;
    }

    #button:hover {
        color: rgb(24,24,24);
        border: 1px solid rgb(198,198,198);
        background: #f7f7f7 linear-gradient(#f7f7f7, #f1f1f1);
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
    }

    #button:active {
        color: rgb(51,51,51);
        border: 1px solid rgb(204,204,204);
        background: rgb(238,238,238) linear-gradient(rgb(238,238,238), rgb(224,224,224));
        box-shadow: 0 1px 2px rgba(0,0,0,.1) inset;
    }

    .input {
        height: 18px;
        margin-right: 10px;
        width: 277px;
        padding: 4px;
        border: 1px solid #999;
        border-radius: 3px;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0);
        transition: .17s linear;
    }

    .input:focus {
        outline: none;
        border: 1px solid #fdd734;
        box-shadow: 0 0 1px 1px #fdd734;
    }

    .input_error, .input_error:focus {
        outline: none;
        border: 1px solid #f33;
        box-shadow: 0 0 1px 1px #f33;
    }

    #notice {
        position: absolute;
        left: 22px;
        margin: 0px;
        top: 44px;
        color: #f33;
        display: none;
    }
</style>