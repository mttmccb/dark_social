import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ImageViewed } from '../resources/messages';
import { ADNImage } from '../models/adn-image';
import 'mapbox.js';
import 'mapbox.js/theme/style.css!';

@inject(AdnAPI, EventAggregator)
export class Checkins {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.showing = false;
    this.adnimage = new ADNImage();
    this.ea = ea;
    ea.subscribe(ImageViewed, msg => this.showModal(msg.image));
  }

  showModal(image) {
    this.adnimage = image;
    this.showing = true;
  }

  hideModal() {
    this.showing = false;
    this.adnimage = new ADNImage();
  }

  activate() {
    return this.api.loadCheckins().then(posts => {
      this.posts = posts;
      console.log(posts);
    });
  }

  attached() {
    this.createMasonry();
    L.mapbox.accessToken = 'pk.eyJ1IjoibXR0bWNjYiIsImEiOiJhNTZkOTMzYWYxMWQ1NzVkZTUxOWYwMTZkMWEyNWNhNiJ9.eOp4wDfZ_aYnPmK5Ul3axA';
    var map = L.mapbox.map('map', 'mapbox.streets')
      .setView([40, -74.50], 9);

    var featureLayer = L.mapbox.featureLayer().addTo(map);
    var geojson = {
      type: 'FeatureCollection',
      features: []
    };

    this.posts.forEach(function (post) {
      post.annotations.forEach(function (annotation) {
        if (annotation.type === "net.app.ohai.location"
          || annotation.type === "net.app.core.checkin"
          || annotation.type === "net.app.core.geolocation") {
          if (annotation.value.longitude) {
            geojson.features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  annotation.value.longitude,
                  annotation.value.latitude
                ]
              }
            });
          }
        }
      });
    });
    featureLayer.setGeoJSON(geojson);
    map.fitBounds(featureLayer.getBounds());
  }

  createMasonry() {
    var container = document.querySelector('#posts');

    imagesLoaded(container, function () {
      var msnry = new Masonry(container, {
        columnWidth: ".post",
        itemSelector: '.post',
        percentPosition: true,
        gutter: 10
      });
    });
  }
}