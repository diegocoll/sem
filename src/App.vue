<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title><b>Avenida Allem</b></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group v-for="item in grupo_semaforos" :value="item.active" v-bind:key="item.id">
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon v-if="item.status === 'OK'" color="green">{{ item.icon }}</v-icon>
                <v-icon v-else-if="item.status === 'DEMORA'" color="yellow">{{ subItem.icon }}</v-icon>
                <v-icon v-else-if="item.status === 'ERROR'" color="red">{{ subItem.icon }}</v-icon>
                <v-icon v-else>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.id }} - Status: {{item.status}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><b>General</b></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon >wifi</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.señal }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon >place</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.lat }} ; {{item.log}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon >access_time</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.fecha }} - {{item.hora}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><b>Sensores</b></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.sensores" v-bind:key="subItem.id" @click="">
              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.type }} - {{subItem.data}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title><b>Semaforos</b></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.semaforos" v-bind:key="subItem.id" @click="">
              <v-list-tile-action>
                <v-icon v-if="subItem.color === 'verde'" color="green">{{ subItem.icon }}</v-icon>
                <v-icon v-else-if="subItem.color === 'rojo'" color="red">{{ subItem.icon }}</v-icon>
                <v-icon v-else-if="subItem.color === 'amarillo'" color="yellow">{{ subItem.icon }}</v-icon>
                <v-icon v-else>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.id }} - {{subItem.color}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list-group>
        <!-- <v-list-tile
          value="true"
          v-for="(index, i) in grupo_semaforos"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="index.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="index.id + ' - Status: '+ index.status"></v-list-tile-title>
            <v-list-tile-sub-title v-html="index.fecha + '-' + index.hora "></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>

    <main>
      <v-content>
        <!-- <v-container fluid> -->
          <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
              <div id="mymap">
                <v-map :zoom="zoom" :center="center">
                  <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
                  <div v-for="item in grupo_semaforos">
                    <v-marker :lat-lng="[item.lat, item.log]">
                      <v-popup :content="'<b>' + item.id + '</b>'"></v-popup>
                    </v-marker>
                    <!-- <v-marker :lat-lng="marker">
                      <v-popup :content="text"></v-popup>
                    </v-marker> -->
                  </div>
                </v-map>
              </div>
              <!-- <router-view/> -->
              <!-- <img src="/static/v.png" alt="Vuetify.js" class="mb-5">
              <blockquote>
                &#8220;First, solve the problem. Then, write the code.&#8221;
                <footer>
                  <small>
                    <em>&mdash;John Johnson</em>
                  </small>
                </footer>
              </blockquote> -->
            </v-layout>
          </v-slide-y-transition>
        <!-- </v-container> -->
      </v-content>
    </main>

    <!-- <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer :fixed="fixed" app>
      <span>DEMO 10/2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet'

  // ESTAS LINEAS SON NECESARIAS PARA CORREGIR EL PROBLEMA CON LA CARGA DE LA IMAGEN DEL ICONO

  import L from 'leaflet';

  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.imagePath = ''
  L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  // ----------------------------------------------------------------------------------------

  export default {
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-popup': Vue2Leaflet.Popup,
      // 'v-icondefault': Vue2Leaflet.IconDefault,
      // 'v-marker-cluster': Vue2LeafletMarkercluster
    },
    data () {

      return {
        text: '<b>SEMAFOROS</b><br>I am a popup.',
        zoom: 13,
        center: [-28.467506, -65.768730],
        url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGllZ29jb2xsIiwiYSI6ImNqOWYwYmppdzJodHoyd3M0c2Z3aGdkb2gifQ.1y37JtJV9JfnCqtXQS0dhg',
        // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: 'OpenStreetMap',
        marker: L.latLng(-28.467510, -65.769694),
        clipped: true,
        drawer: false,
        fixed: true,
        lineas_semaforos:[],
        grupo_semaforos: [{
          id: 'SEMG0001',
          lat: '-28.465206',
          log: '-65.769865',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0001',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '26',
            },{
            id: 'SEMS0002',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '48',
            },{
            id: 'SEMS0003',
            type: 'transito',
            icon: 'directions_car',
            status: 'OK',
            data: '39',
          }],
          semaforos: [{
            id: 'SEM0001',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0002',
            icon: 'traffic',
            status: 'OK',
            color: 'amarillo'
            },{
            id: 'SEM0003',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0004',
            icon: 'traffic',
            status: 'OK',
            color: 'amarillo'
            }]
          },{
          id: 'SEMG0002',
          lat: '-28.466352',
          log: '-65.769772',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0004',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '28',
            },{
            id: 'SEMS0005',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '46',
            },{
            id: 'SEMS0006',
            type: 'transito',
            icon: 'directions_car',
            status: 'OK',
            data: '36',
          }],
          semaforos: [{
            id: 'SEM0005',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0006',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0007',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0008',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0003',
          lat: '-28.467510',
          log: '-65.769694',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0007',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '26.6',
            },{
            id: 'SEMS0008',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '47',
          }],
          semaforos: [{
            id: 'SEM0009',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0010',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0011',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0012',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0004',
          lat: '-28.468894',
          log: '-65.769589',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [],
          semaforos: [{
            id: 'SEM0013',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0014',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0015',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0016',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0005',
          lat: '-28.470280',
          log: '-65.769559',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'media',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0009',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '24',
            },{
            id: 'SEMS0010',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '47',
            },{
            id: 'SEMS0011',
            type: 'transito',
            icon: 'directions_car',
            status: 'OK',
            data: '34',
          }],
          semaforos: [{
            id: 'SEM0017',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0018',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0019',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0020',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0006',
          lat: '-28.471732',
          log: '-65.769487',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0012',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '28',
            },{
            id: 'SEMS0013',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '46',
            }],
          semaforos: [{
            id: 'SEM0021',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0022',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0023',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0024',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0007',
          lat: '-28.472954',
          log: '-65.769428',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [],
          semaforos: [{
            id: 'SEM0025',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0026',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0027',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0028',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0008',
          lat: '-28.474321',
          log: '-65.769377',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0014',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '28',
            },{
            id: 'SEMS0015',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '47',
            },{
            id: 'SEMS0016',
            type: 'transito',
            icon: 'directions_car',
            status: 'OK',
            data: '43',
          }],
          semaforos: [{
            id: 'SEM0029',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0030',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0031',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0032',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          },{
          id: 'SEMG0009',
          lat: '-28.475679',
          log: '-65.769388',
          icon: 'settings_remote',
          status: 'OK',
          señal: 'buena',
          fecha: '03/10/2017',
          hora: '22:30',
          sensores: [{
            id: 'SEMS0017',
            type: 'termometro',
            icon: 'brightness_low',
            status: 'OK',
            data: '28',
            },{
            id: 'SEMS0018',
            type: 'humedad',
            icon: 'invert_colors',
            status: 'OK',
            data: '46',
            }],
          semaforos: [{
            id: 'SEM0033',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0034',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            },{
            id: 'SEM0035',
            icon: 'traffic',
            status: 'OK',
            color: 'rojo'
            },{
            id: 'SEM0036',
            icon: 'traffic',
            status: 'OK',
            color: 'verde'
            }]
          }
        ],

        miniVariant: false,
        // right: true,
        // rightDrawer: false,
        title: 'Sistema de Gestion y Control de Semaforos - LARTEC'
      }
    }
  }
</script>

<style>
#mymap {
  position: relative;
  /*padding: 0;*/
  width: 100%;
  height: 800px;
  z-index: 0;
}
</style>
