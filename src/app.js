'use strict';

const electron = require('electron');
const { dialog } = electron.remote;
const optimize = require('./optimize');

const app = new Vue({
  el: '#app',
  data: {
    list: [],
    dest: '',
    isLoading: false
  },
  computed: {
    isDisabled() {
      if (this.list.length==0 || this.dest.length==0 || this.isLoading) {
        return true;
      }
      return false;
    }
  },
  methods: {
    onDrop(event) {
      let files = event.target.files;
      Array.from(files).forEach(file => {
        this.list.push(file);
      });
    },
    destination() {
      const d = dialog.showOpenDialogSync({ 
        properties: ['openDirectory'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png'] }]
      });
      this.dest = d[0];
    },
    process() {
      this.isLoading = true;
      let paths = [];
      this.list.forEach(item => { paths.push(item.path); });
      optimize.optimize(paths, this.dest).then(res => {
        this.isLoading = false;
      });
    },
    clearList() {
      this.list = [];
    },
    removeItem(i) {
      if (this.list.length == 1) {
        this.clearList();
      } else {
        this.list.splice(i, 1);
      }
    }
  }
})