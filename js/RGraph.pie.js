RGraph = window.RGraph || { isRGraph: true };
RGraph.Pie = function(conf) {
  if (typeof conf === 'object' && typeof conf.data === 'object' && typeof conf.id === 'string') {
    var id = conf.id,
      canvas = document.getElementById(id),
      data = conf.data,
      parseConfObjectForOptions = true;
  } else {
    var id = conf,
      canvas = document.getElementById(id),
      data = arguments[1];
  }
  this.id = id;
  this.canvas = canvas;
  this.context = this.canvas.getContext
    ? this.canvas.getContext('2d', { alpha: typeof id === 'object' && id.alpha === false ? false : true })
    : null;
  this.canvas.__object__ = this;
  this.total = 0;
  this.subTotal = 0;
  this.angles = [];
  this.data = data;
  this.properties = [];
  this.type = 'pie';
  this.isRGraph = true;
  this.coords = [];
  this.coords.key = [];
  this.coordsSticks = [];
  this.coordsText = [];
  this.uid = RGraph.CreateUID();
  this.canvas.uid = this.canvas.uid ? this.canvas.uid : RGraph.CreateUID();
  this.colorsParsed = false;
  this.original_colors = [];
  this.firstDraw = true;
  this.exploding = null;
  for (var i = 0; i < this.data.length; ++i) {
    if (typeof this.data[i] === 'string') {
      this.data[i] = parseFloat(this.data[i]);
    }
  }
  this.properties = {
    'chart.centerx.adjust': 0,
    'chart.centery.adjust': 0,
    'chart.colors': [
      'red',
      '#ccc',
      '#cfc',
      'blue',
      'pink',
      'yellow',
      'black',
      'orange',
      'cyan',
      'purple',
      '#78CAEA',
      '#E284E9',
      'white',
      'blue',
      '#9E7BF6'
    ],
    'chart.strokestyle': 'white',
    'chart.linewidth': 3,
    'chart.labels': [],
    'chart.labels.bold': false,
    'chart.labels.sticks': false,
    'chart.labels.sticks.length': 7,
    'chart.labels.sticks.colors': null,
    'chart.labels.sticks.usecolors': false,
    'chart.labels.sticks.linewidth': 1,
    'chart.labels.sticks.hlength': 5,
    'chart.labels.sticks.list': false,
    'chart.labels.ingraph': null,
    'chart.labels.ingraph.color': null,
    'chart.labels.ingraph.font': null,
    'chart.labels.ingraph.size': null,
    'chart.labels.ingraph.bounding': true,
    'chart.labels.ingraph.bounding.fill': 'white',
    'chart.labels.ingraph.specific': null,
    'chart.labels.ingraph.units.pre': '',
    'chart.labels.ingraph.units.post': '',
    'chart.labels.ingraph.radius': null,
    'chart.labels.center': null,
    'chart.labels.center.size': 26,
    'chart.labels.center.font': 'Segoe UI, Arial, Verdana, sans-serif',
    'chart.labels.center.color': 'black',
    'chart.labels.center.italic': false,
    'chart.labels.center.bold': false,
    'chart.labels.center.units.pre': '',
    'chart.labels.center.units.post': '',
    'chart.gutter.left': 25,
    'chart.gutter.right': 25,
    'chart.gutter.top': 25,
    'chart.gutter.bottom': 25,
    'chart.title': '',
    'chart.title.background': null,
    'chart.title.hpos': null,
    'chart.title.vpos': 0.5,
    'chart.title.bold': true,
    'chart.title.font': null,
    'chart.title.x': null,
    'chart.title.y': null,
    'chart.title.halign': null,
    'chart.title.valign': null,
    'chart.shadow': true,
    'chart.shadow.color': '#aaa',
    'chart.shadow.offsetx': 0,
    'chart.shadow.offsety': 0,
    'chart.shadow.blur': 15,
    'chart.text.size': 12,
    'chart.text.color': 'black',
    'chart.text.font': 'Segoe UI, Arial, Verdana, sans-serif',
    'chart.text.accessible': true,
    'chart.text.accessible.overflow': 'visible',
    'chart.text.accessible.pointerevents': true,
    'chart.contextmenu': null,
    'chart.tooltips': null,
    'chart.tooltips.event': 'onclick',
    'chart.tooltips.effect': 'fade',
    'chart.tooltips.css.class': 'RGraph_tooltip',
    'chart.tooltips.highlight': true,
    'chart.highlight.style': '2d',
    'chart.highlight.style.twod.fill': 'rgba(255,255,255,0.7)',
    'chart.highlight.style.twod.stroke': 'rgba(255,255,255,0.7)',
    'chart.highlight.style.outline.width': null,
    'chart.centerx': null,
    'chart.centery': null,
    'chart.radius': null,
    'chart.border': false,
    'chart.border.color': 'rgba(255,255,255,0.5)',
    'chart.key': null,
    'chart.key.background': 'white',
    'chart.key.position': 'graph',
    'chart.key.halign': 'right',
    'chart.key.shadow': false,
    'chart.key.shadow.color': '#666',
    'chart.key.shadow.blur': 3,
    'chart.key.shadow.offsetx': 2,
    'chart.key.shadow.offsety': 2,
    'chart.key.position.gutter.boxed': false,
    'chart.key.position.x': null,
    'chart.key.position.y': null,
    'chart.key.color.shape': 'square',
    'chart.key.rounded': true,
    'chart.key.linewidth': 1,
    'chart.key.colors': null,
    'chart.key.interactive': false,
    'chart.key.interactive.highlight.chart.stroke': 'black',
    'chart.key.interactive.highlight.chart.fill': 'rgba(255,255,255,0.7)',
    'chart.key.interactive.highlight.label': 'rgba(255,0,0,0.2)',
    'chart.key.text.color': 'black',
    'chart.annotatable': false,
    'chart.annotate.color': 'black',
    'chart.zoom.factor': 1.5,
    'chart.zoom.fade.in': true,
    'chart.zoom.fade.out': true,
    'chart.zoom.hdir': 'right',
    'chart.zoom.vdir': 'down',
    'chart.zoom.frames': 25,
    'chart.zoom.delay': 16.666,
    'chart.zoom.shadow': true,
    'chart.zoom.background': true,
    'chart.zoom.action': 'zoom',
    'chart.resizable': false,
    'chart.resize.handle.adjust': [0, 0],
    'chart.resize.handle.background': null,
    'chart.variant': 'pie',
    'chart.variant.donut.width': null,
    'chart.variant.threed.depth': 20,
    'chart.exploded': [],
    'chart.effect.roundrobin.multiplier': 1,
    'chart.events.click': null,
    'chart.events.mousemove': null,
    'chart.centerpin': null,
    'chart.centerpin.fill': 'gray',
    'chart.centerpin.stroke': 'white',
    'chart.origin': 0 - Math.PI / 2,
    'chart.events': true,
    'chart.labels.colors': [],
    'chart.clearto': 'rgba(0,0,0,0)'
  };
  for (var i = 0, len = data.length; i < len; i++) {
    this.total += data[i];
    this['$' + i] = {};
  }
  if (!this.canvas.__rgraph_aa_translated__) {
    this.context.translate(0.5, 0.5);
    this.canvas.__rgraph_aa_translated__ = true;
  }
  var RG = RGraph,
    ca = this.canvas,
    co = ca.getContext('2d'),
    prop = this.properties,
    pa2 = RG.path2,
    win = window,
    doc = document,
    ma = Math;
  if (RG.Effects && typeof RG.Effects.decorate === 'function') {
    RG.Effects.decorate(this);
  }
  this.set = this.Set = function(name) {
    var value = typeof arguments[1] === 'undefined' ? null : arguments[1];
    if (arguments.length === 1 && typeof name === 'object') {
      RG.parseObjectStyleConfig(this, name);
      return this;
    }
    if (name.substr(0, 6) != 'chart.') {
      name = 'chart.' + name;
    }
    while (name.match(/([A-Z])/)) {
      name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
    }
    if (name == 'chart.highlight.style.twod.color') {
      name = 'chart.highlight.style.twod.fill';
    }
    if (name == 'chart.labels.spaced') {
      name = 'chart.labels.sticks.list';
    }
    prop[name] = value;
    return this;
  };
  this.get = this.Get = function(name) {
    if (name.substr(0, 6) != 'chart.') {
      name = 'chart.' + name;
    }
    while (name.match(/([A-Z])/)) {
      name = name.replace(/([A-Z])/, '.' + RegExp.$1.toLowerCase());
    }
    if (name == 'chart.highlight.style.twod.color') {
      name = 'chart.highlight.style.twod.fill';
    }
    return prop[name];
  };
  this.draw = this.Draw = function() {
    RG.FireCustomEvent(this, 'onbeforedraw');
    this.gutterLeft = prop['chart.gutter.left'];
    this.gutterRight = prop['chart.gutter.right'];
    this.gutterTop = prop['chart.gutter.top'];
    this.gutterBottom = prop['chart.gutter.bottom'];
    this.radius = this.getRadius();
    this.centerx = this.graph.width / 2 + this.gutterLeft + prop['chart.centerx.adjust'];
    this.centery = this.graph.height / 2 + this.gutterTop + prop['chart.centery.adjust'];
    this.subTotal = this.properties['chart.origin'];
    this.angles = [];
    this.coordsText = [];
    if (typeof prop['chart.radius'] === 'number') this.radius = prop['chart.radius'];
    if (typeof prop['chart.centerx'] === 'number') this.centerx = prop['chart.centerx'];
    if (typeof prop['chart.centery'] === 'number') this.centery = prop['chart.centery'];
    if (this.radius <= 0) {
      return;
    }
    if (!this.colorsParsed) {
      this.parseColors();
      this.colorsParsed = true;
    }
    if (prop['chart.labels.colors'].length < prop['chart.labels'].length) {
      while (prop['chart.labels.colors'].length < prop['chart.labels'].length) {
        prop['chart.labels.colors'].push(prop['chart.labels.colors'][prop['chart.labels.colors'].length - 1]);
      }
    } else {
      if (typeof prop['chart.labels.colors'] === 'undefined') {
        prop['chart.labels.colors'] = [];
      }
      while (prop['chart.labels.colors'].length < prop['chart.labels'].length) {
        prop['chart.labels.colors'].push(prop['chart.text.color']);
      }
    }
    if (prop['chart.variant'].indexOf('3d') > 0) {
      return this.draw3d();
    }
    RG.DrawTitle(
      this,
      prop['chart.title'],
      ca.height / 2 - this.radius - 5,
      this.centerx,
      prop['chart.title.size'] ? prop['chart.title.size'] : prop['chart.text.size'] + 2
    );
    this.total = RG.array_sum(this.data);
    var tot = this.total;
    var data = this.data;
    for (var i = 0, len = this.data.length; i < len; i++) {
      var angle = data[i] / tot * RG.TWOPI;
      this.DrawSegment(angle, prop['chart.colors'][i], i == len - 1, i);
    }
    RG.NoShadow(this);
    if (prop['chart.linewidth'] > 0) {
      this.DrawBorders();
    }
    var len = this.angles.length;
    var r = this.radius;
    for (var action = 0; action < 2; action += 1) {
      for (var i = 0; i < len; i++) {
        co.beginPath();
        var segment = this.angles[i];
        if (action === 1) {
          co.strokeStyle =
            typeof prop['chart.strokestyle'] == 'object' ? prop['chart.strokestyle'][i] : prop['chart.strokestyle'];
        }
        prop['chart.colors'][i] ? (co.fillStyle = prop['chart.colors'][i]) : null;
        co.lineJoin = 'round';
        co.arc(segment[2], segment[3], r, segment[0], segment[1], false);
        if (prop['chart.variant'] == 'donut') {
          co.arc(
            segment[2],
            segment[3],
            typeof prop['chart.variant.donut.width'] == 'number' ? r - prop['chart.variant.donut.width'] : r / 2,
            segment[1],
            segment[0],
            true
          );
        } else {
          co.lineTo(segment[2], segment[3]);
        }
        co.closePath();
        action === 0 ? co.fill() : co.stroke();
      }
    }
    if (prop['chart.labels.sticks']) {
      this.DrawSticks();
      var strokeStyle = prop['chart.strokestyle'];
    }
    if (prop['chart.labels']) {
      this.DrawLabels();
    }
    if (prop['chart.centerpin']) {
      this.DrawCenterpin();
    }
    if (prop['chart.labels.ingraph']) {
      this.DrawInGraphLabels();
    }
    if (!RG.isNull(prop['chart.labels.center'])) {
      this.drawCenterLabel(prop['chart.labels.center']);
    }
    if (prop['chart.contextmenu']) {
      RG.ShowContext(this);
    }
    if (prop['chart.border']) {
      co.beginPath();
      co.lineWidth = 5;
      co.strokeStyle = prop['chart.border.color'];
      co.arc(this.centerx, this.centery, this.radius - 2, 0, RG.TWOPI, 0);
      co.stroke();
    }
    if (prop['chart.key'] && prop['chart.key'].length) {
      RG.DrawKey(this, prop['chart.key'], prop['chart.colors']);
    }
    RG.NoShadow(this);
    if (prop['chart.resizable']) {
      RG.AllowResizing(this);
    }
    if (prop['chart.events'] == true) {
      RG.InstallEventListeners(this);
    }
    if (this.firstDraw) {
      this.firstDraw = false;
      RG.fireCustomEvent(this, 'onfirstdraw');
      this.firstDrawFunc();
    }
    RG.FireCustomEvent(this, 'ondraw');
    return this;
  };
  this.exec = function(func) {
    func(this);
    return this;
  };
  this.drawSegment = this.DrawSegment = function(radians, color, last, index) {
    if (RGraph.ISOLD && radians == RG.TWOPI) {
      radians -= 0.0001;
    } else if (RGraph.ISOLD && radians == 0) {
      radians = 0.001;
    }
    var subTotal = this.subTotal;
    radians = radians * prop['chart.effect.roundrobin.multiplier'];
    co.beginPath();
    color ? (co.fillStyle = color) : null;
    co.strokeStyle = prop['chart.strokestyle'];
    co.lineWidth = 0;
    if (prop['chart.shadow']) {
      RG.setShadow(
        this,
        prop['chart.shadow.color'],
        prop['chart.shadow.offsetx'],
        prop['chart.shadow.offsety'],
        prop['chart.shadow.blur']
      );
    }
    if (
      (typeof prop['chart.exploded'] == 'object' && prop['chart.exploded'][index] > 0) ||
      typeof prop['chart.exploded'] == 'number'
    ) {
      var explosion =
        typeof prop['chart.exploded'] == 'number' ? prop['chart.exploded'] : prop['chart.exploded'][index];
      var x = 0;
      var y = 0;
      var h = explosion;
      var t = subTotal + radians / 2;
      var x = Math.cos(t) * explosion;
      var y = Math.sin(t) * explosion;
      var r = this.radius;
      co.moveTo(this.centerx + x, this.centery + y);
    } else {
      var x = 0;
      var y = 0;
      var r = this.radius;
    }
    var startAngle = subTotal;
    var endAngle = subTotal + radians;
    co.arc(this.centerx + x, this.centery + y, r, startAngle, endAngle, 0);
    if (prop['chart.variant'] == 'donut') {
      co.arc(
        this.centerx + x,
        this.centery + y,
        typeof prop['chart.variant.donut.width'] == 'number' ? r - prop['chart.variant.donut.width'] : r / 2,
        endAngle,
        startAngle,
        true
      );
    } else {
      co.lineTo(this.centerx + x, this.centery + y);
    }
    co.closePath();
    this.angles.push([subTotal, subTotal + radians, this.centerx + x, this.centery + y]);
    co.fill();
    this.subTotal += radians;
  };
  this.drawLabels = this.DrawLabels = function() {
    if (prop['chart.labels'].length && prop['chart.labels.sticks.list']) {
      return this.drawLabelsList();
    }
    var hAlignment = 'left',
      vAlignment = 'center',
      labels = prop['chart.labels'],
      context = co,
      font = prop['chart.text.font'],
      bold = prop['chart.labels.bold'],
      text_size = prop['chart.text.size'],
      cx = this.centerx,
      cy = this.centery,
      r = this.radius;
    RG.noShadow(this);
    co.fillStyle = 'black';
    co.beginPath();
    if (labels && labels.length) {
      for (i = 0; i < this.angles.length; ++i) {
        var segment = this.angles[i];
        if (typeof labels[i] != 'string' && typeof labels[i] != 'number') {
          continue;
        }
        co.moveTo(cx, cy);
        var a = segment[0] + (segment[1] - segment[0]) / 2,
          angle = (segment[1] - segment[0]) / 2 + segment[0];
        if (
          (typeof prop['chart.exploded'] === 'object' && prop['chart.exploded'][i]) ||
          typeof prop['chart.exploded'] == 'number'
        ) {
          var t = (segment[1] - segment[0]) / 2,
            seperation = typeof prop['chart.exploded'] == 'number' ? prop['chart.exploded'] : prop['chart.exploded'][i];
          var explosion_offsetx = Math.cos(angle) * seperation,
            explosion_offsety = Math.sin(angle) * seperation;
        } else {
          var explosion_offsetx = 0,
            explosion_offsety = 0;
        }
        if (prop['chart.labels.sticks']) {
          explosion_offsetx +=
            ma.cos(angle) *
            (typeof prop['chart.labels.sticks.length'] === 'object'
              ? prop['chart.labels.sticks.length'][i]
              : prop['chart.labels.sticks.length']);
          explosion_offsety +=
            ma.sin(angle) *
            (typeof prop['chart.labels.sticks.length'] === 'object'
              ? prop['chart.labels.sticks.length'][i]
              : prop['chart.labels.sticks.length']);
        }
        var x =
            cx +
            explosion_offsetx +
            (r + 10) * Math.cos(a) +
            (prop['chart.labels.sticks'] ? (a < RG.HALFPI || a > RG.TWOPI + RG.HALFPI ? 2 : -2) : 0),
          y = cy + explosion_offsety + (r + 10) * Math.sin(a);
        if (this.coordsSticks && this.coordsSticks[i]) {
          var x = this.coordsSticks[i][4][0] + (x < cx ? -5 : 5),
            y = this.coordsSticks[i][4][1];
        }
        vAlignment = 'center';
        hAlignment = x < cx ? 'right' : 'left';
        co.fillStyle = prop['chart.text.color'];
        if (
          typeof prop['chart.labels.colors'] === 'object' &&
          prop['chart.labels.colors'] &&
          prop['chart.labels.colors'][i]
        ) {
          co.fillStyle = prop['chart.labels.colors'][i];
        }
        RG.text2(this, {
          font: font,
          size: text_size,
          x: x,
          y: y,
          text: labels[i],
          valign: vAlignment,
          halign: hAlignment,
          tag: 'labels',
          bold: bold,
          color: prop['chart.labels.sticks.usecolors'] ? prop['chart.colors'][i] : 'black'
        });
      }
      co.fill();
    }
  };
  this.drawLabelsList = function() {
    var segment = this.angles[i],
      labels = prop['chart.labels'],
      labels_right = [],
      labels_left = [],
      text_font = prop['chart.text.font'],
      text_size = prop['chart.text.size'],
      text_color = prop['chart.text.color'],
      left = [],
      right = [],
      centerx = this.centerx,
      centery = this.centery,
      radius = this.radius,
      offset = 50;
    for (var i = 0; i < this.angles.length; ++i) {
      var angle = this.angles[i][0] + (this.angles[i][1] - this.angles[i][0]) / 2,
        endpoint_inner = RG.getRadiusEndPoint(centerx, centery, angle, radius + 5),
        endpoint_outer = RG.getRadiusEndPoint(centerx, centery, angle, radius + 10),
        explosion = [
          typeof prop['chart.exploded'] === 'number' ? prop['chart.exploded'] : prop['chart.exploded'][i],
          ma.cos(angle) *
            (typeof prop['chart.exploded'] === 'number' ? prop['chart.exploded'] : prop['chart.exploded'][i]),
          ma.sin(angle) *
            (typeof prop['chart.exploded'] === 'number' ? prop['chart.exploded'] : prop['chart.exploded'][i])
        ];
      if (
        typeof prop['chart.labels.sticks.colors'] === 'object' &&
        prop['chart.labels.sticks.colors'] &&
        prop['chart.labels.sticks.colors'][i]
      ) {
        var color = prop['chart.labels.sticks.colors'][i];
      } else if (prop['chart.labels.sticks.usecolors'] && prop['chart.colors'][i]) {
        var color = prop['chart.colors'][i];
      } else {
        var color = prop['chart.text.color'];
      }
      if (angle > -1 * RG.HALFPI && angle < RG.HALFPI) {
        labels_right.push([
          i,
          angle,
          labels[i] ? labels[i] : '',
          endpoint_inner,
          endpoint_outer,
          color,
          RG.arrayClone(explosion)
        ]);
      } else {
        labels_left.push([
          i,
          angle,
          labels[i] ? labels[i] : '',
          endpoint_inner,
          endpoint_outer,
          color,
          RG.arrayClone(explosion)
        ]);
      }
    }
    var vspace_right = (ca.height - prop['chart.gutter.top'] - prop['chart.gutter.bottom']) / labels_right.length;
    for (var i = 0, y = prop['chart.gutter.top'] + vspace_right / 2; i < labels_right.length; y += vspace_right, i++) {
      if (labels_right[i][2]) {
        var x = this.centerx + this.radius + offset,
          idx = labels_right[i][0],
          explosionX = labels_right[i][6][0] ? labels_right[i][6][1] : 0,
          explosionY = labels_right[i][6][0] ? labels_right[i][6][2] : 0;
        var ret = RG.text2(this, {
          font: text_font,
          size: text_size,
          x: x + explosionX,
          y: y + explosionY,
          text: labels_right[i][2],
          valign: 'center',
          halign: 'left',
          tag: 'labels',
          color: labels_right[i][5]
        });
        if (ret && ret.node) {
          ret.node.__index__ = labels_right[i][0];
        }
        pa2(
          co,
          'lc round lw % b m % % l % % l % % l % % s %',
          prop['chart.labels.sticks.linewidth'],
          labels_right[i][3][0] + explosionX,
          labels_right[i][3][1] + explosionY,
          labels_right[i][4][0] + explosionX,
          labels_right[i][4][1] + explosionY,
          this.centerx + this.radius + 25 + explosionX,
          ma.round(labels_right[i][4][1] + explosionY),
          ret.x - 5,
          ret.y + ret.height / 2,
          labels_right[i][5]
        );
      }
    }
    var vspace_left = (ca.height - prop['chart.gutter.top'] - prop['chart.gutter.bottom']) / labels_left.length;
    for (
      var i = labels_left.length - 1, y = prop['chart.gutter.top'] + vspace_left / 2;
      i >= 0;
      y += vspace_left, i--
    ) {
      if (labels_left[i][2]) {
        var x = this.centerx - this.radius - offset,
          idx = labels_left[i][0],
          explosionX = labels_left[i][6][0] ? labels_left[i][6][1] : 0,
          explosionY = labels_left[i][6][0] ? labels_left[i][6][2] : 0;
        var ret = RG.text2(this, {
          font: text_font,
          size: text_size,
          x: x + explosionX,
          y: y + explosionY,
          text: labels_left[i][2],
          valign: 'center',
          halign: 'right',
          tag: 'labels',
          color: labels_left[i][5]
        });
        if (ret && ret.node) {
          ret.node.__index__ = labels_left[i][0];
        }
        pa2(
          co,
          'lw % b m % % l % % l % % l % % s %',
          prop['chart.labels.sticks.linewidth'],
          labels_left[i][3][0] + explosionX,
          labels_left[i][3][1] + explosionY,
          labels_left[i][4][0] + explosionX,
          labels_left[i][4][1] + explosionY,
          this.centerx - this.radius - 25 + explosionX,
          ma.round(labels_left[i][4][1] + explosionY),
          ret.x + 5 + ret.width,
          ret.y + ret.height / 2,
          labels_left[i][5]
        );
      }
    }
  };
  this.drawSticks = this.DrawSticks = function() {
    var offset = prop['chart.linewidth'] / 2,
      exploded = prop['chart.exploded'],
      sticks = prop['chart.labels.sticks'],
      colors = prop['chart.colors'],
      cx = this.centerx,
      cy = this.centery,
      radius = this.radius,
      points = [],
      linewidth = prop['chart.labels.sticks.linewidth'];
    for (var i = 0, len = this.angles.length; i < len; ++i) {
      var segment = this.angles[i];
      if (typeof sticks === 'object' && !sticks[i]) {
        continue;
      }
      var radians = segment[1] - segment[0];
      co.beginPath();
      co.strokeStyle =
        typeof prop['chart.labels.sticks.colors'] === 'string'
          ? prop['chart.labels.sticks.colors']
          : !RG.isNull(prop['chart.labels.sticks.colors']) ? prop['chart.labels.sticks.colors'][i] : 'gray';
      co.lineWidth = linewidth;
      if (typeof prop['chart.labels.sticks.color'] === 'string') {
        co.strokeStyle = prop['chart.labels.sticks.color'];
      }
      if (prop['chart.labels.sticks.usecolors']) {
        co.strokeStyle = prop['chart.colors'][i];
      }
      var midpoint = segment[0] + radians / 2;
      if (typeof exploded === 'object' && exploded[i]) {
        var extra = exploded[i];
      } else if (typeof exploded === 'number') {
        var extra = exploded;
      } else {
        var extra = 0;
      }
      var stickLength =
        typeof prop['chart.labels.sticks.length'] === 'object'
          ? prop['chart.labels.sticks.length'][i]
          : prop['chart.labels.sticks.length'];
      points[0] = RG.getRadiusEndPoint(cx, cy, midpoint, radius + extra + offset);
      points[1] = RG.getRadiusEndPoint(cx, cy, midpoint, radius + stickLength + extra - 5);
      points[2] = RG.getRadiusEndPoint(cx, cy, midpoint, radius + stickLength + extra);
      points[3] = RG.getRadiusEndPoint(cx, cy, midpoint, radius + stickLength + extra);
      points[3][0] += points[3][0] > cx ? 5 : -5;
      points[4] = [
        points[2][0] +
          (points[2][0] > cx ? 5 + prop['chart.labels.sticks.hlength'] : -5 - prop['chart.labels.sticks.hlength']),
        points[2][1]
      ];
      co.moveTo(points[0][0], points[0][1]);
      co.quadraticCurveTo(points[2][0], points[2][1], points[4][0], points[4][1]);
      co.stroke();
      this.coordsSticks[i] = [points[0], points[1], points[2], points[3], points[4]];
    }
  };
  this.getShape = this.getSegment = function(e) {
    RG.FixEventObject(e);
    var accuracy = arguments[1] ? arguments[1] : 0;
    var canvas = ca;
    var context = co;
    var mouseCoords = RG.getMouseXY(e);
    var mouseX = mouseCoords[0];
    var mouseY = mouseCoords[1];
    var r = this.radius;
    var angles = this.angles;
    var ret = [];
    for (var i = 0, len = angles.length; i < len; ++i) {
      co.beginPath();
      co.strokeStyle = 'rgba(0,0,0,0)';
      co.arc(angles[i][2], angles[i][3], this.radius, angles[i][0], angles[i][1], false);
      if (this.type == 'pie' && prop['chart.variant'] == 'donut') {
        co.arc(
          angles[i][2],
          angles[i][3],
          typeof prop['chart.variant.donut.width'] == 'number'
            ? this.radius - prop['chart.variant.donut.width']
            : this.radius / 2,
          angles[i][1],
          angles[i][0],
          true
        );
      } else {
        co.lineTo(angles[i][2], angles[i][3]);
      }
      co.closePath();
      if (!co.isPointInPath(mouseX, mouseY)) {
        continue;
      }
      ret[0] = angles[i][2];
      ret[1] = angles[i][3];
      ret[2] = this.radius;
      ret[3] = angles[i][0] - RG.TWOPI;
      ret[4] = angles[i][1];
      ret[5] = i;
      if (ret[3] < 0) ret[3] += RG.TWOPI;
      if (ret[4] > RG.TWOPI) ret[4] -= RG.TWOPI;
      var tooltip = RG.parseTooltipText ? RG.parseTooltipText(prop['chart.tooltips'], ret[5]) : null;
      ret['object'] = this;
      ret['x'] = ret[0];
      ret['y'] = ret[1];
      ret['radius'] = ret[2];
      ret['angle.start'] = ret[3];
      ret['angle.end'] = ret[4];
      ret['index'] = ret[5];
      ret['tooltip'] = tooltip;
      return ret;
    }
    return null;
  };
  this.drawBorders = this.DrawBorders = function() {
    if (prop['chart.linewidth'] > 0) {
      co.lineWidth = prop['chart.linewidth'];
      co.strokeStyle = prop['chart.strokestyle'];
      var r = this.radius;
      for (var i = 0, len = this.angles.length; i < len; ++i) {
        var segment = this.angles[i];
        co.beginPath();
        co.arc(segment[2], segment[3], r, segment[0], segment[0] + 0.001, 0);
        co.arc(
          segment[2],
          segment[3],
          prop['chart.variant'] == 'donut'
            ? typeof prop['chart.variant.donut.width'] == 'number'
              ? this.radius - prop['chart.variant.donut.width']
              : r / 2
            : r,
          segment[0],
          segment[0] + 0.0001,
          0
        );
        co.closePath();
        co.stroke();
      }
    }
  };
  this.getRadius = function() {
    this.graph = {
      width: ca.width - prop['chart.gutter.left'] - prop['chart.gutter.right'],
      height: ca.height - prop['chart.gutter.top'] - prop['chart.gutter.bottom']
    };
    if (typeof prop['chart.radius'] == 'number') {
      this.radius = prop['chart.radius'];
    } else {
      this.radius = Math.min(this.graph.width, this.graph.height) / 2;
    }
    return this.radius;
  };
  this.explodeSegment = this.Explode = function(index, size) {
    if (typeof this.exploding === 'number' && this.exploding === index) {
      return;
    }
    if (!prop['chart.exploded']) {
      prop['chart.exploded'] = [];
    }
    if (typeof prop['chart.exploded'] == 'number') {
      var original_explode = prop['chart.exploded'];
      var exploded = prop['chart.exploded'];
      prop['chart.exploded'] = [];
      for (var i = 0, len = this.data.length; i < len; ++i) {
        prop['chart.exploded'][i] = exploded;
      }
    }
    prop['chart.exploded'][index] = typeof original_explode == 'number' ? original_explode : 0;
    this.exploding = index;
    var delay = RG.ISIE && !RG.ISIE10 ? 25 : 16.666;
    for (var o = 0; o < size; ++o) {
      setTimeout(function() {
        prop['chart.exploded'][index] += 1;
        RG.Clear(ca);
        RG.RedrawCanvas(ca);
      }, o * delay);
    }
    var obj = this;
    setTimeout(function() {
      obj.exploding = null;
    }, size * delay);
  };
  this.highlight_segment = function(segment) {
    co.beginPath();
    co.strokeStyle = prop['chart.highlight.style.twod.stroke'];
    co.fillStyle = prop['chart.highlight.style.twod.fill'];
    co.moveTo(segment[0], segment[1]);
    co.arc(segment[0], segment[1], segment[2], this.angles[segment[5]][0], this.angles[segment[5]][1], 0);
    co.lineTo(segment[0], segment[1]);
    co.closePath();
    co.stroke();
    co.fill();
  };
  this.highlight = this.Highlight = function(shape) {
    if (prop['chart.tooltips.highlight']) {
      if (typeof prop['chart.highlight.style'] === 'function') {
        prop['chart.highlight.style'](shape);
      } else if (prop['chart.highlight.style'] == '3d') {
        co.lineWidth = 1;
        var extent = 2;
        co.beginPath();
        RG.NoShadow(this);
        co.fillStyle = 'rgba(0,0,0,0)';
        co.arc(shape['x'], shape['y'], shape['radius'], shape['angle.start'], shape['angle.end'], false);
        if (prop['chart.variant'] == 'donut') {
          co.arc(shape['x'], shape['y'], shape['radius'] / 5, shape['angle.end'], shape['angle.start'], true);
        } else {
          co.lineTo(shape['x'], shape['y']);
        }
        co.closePath();
        co.fill();
        co.beginPath();
        co.shadowColor = '#666';
        co.shadowBlur = 3;
        co.shadowOffsetX = 3;
        co.shadowOffsetY = 3;
        co.fillStyle = prop['chart.colors'][shape['index']];
        co.strokeStyle = prop['chart.strokestyle'];
        co.arc(
          shape['x'] - extent,
          shape['y'] - extent,
          shape['radius'],
          shape['angle.start'],
          shape['angle.end'],
          false
        );
        if (prop['chart.variant'] == 'donut') {
          co.arc(
            shape['x'] - extent,
            shape['y'] - extent,
            shape['radius'] / 2,
            shape['angle.end'],
            shape['angle.start'],
            true
          );
        } else {
          co.lineTo(shape['x'] - extent, shape['y'] - extent);
        }
        co.closePath();
        co.stroke();
        co.fill();
        RG.NoShadow(this);
        if (prop['chart.border']) {
          co.beginPath();
          co.strokeStyle = prop['chart.border.color'];
          co.lineWidth = 5;
          co.arc(
            shape['x'] - extent,
            shape['y'] - extent,
            shape['radius'] - 2,
            shape['angle.start'],
            shape['angle.end'],
            false
          );
          co.stroke();
        }
      } else if (prop['chart.highlight.style'] === 'outline') {
        var tooltip = RG.Registry.get('chart.tooltip'),
          index = tooltip.__index__,
          coords = this.angles[index],
          color = this.get('colors')[index];
        width = this.radius / 12.5;
        if (typeof prop['chart.highlight.style.outline.width'] === 'number') {
          width = prop['chart.highlight.style.outline.width'];
        }
        RGraph.path2(
          co,
          'ga 0.25 b a % % % % % false a % % % % % true c f % ga 1',
          coords[2],
          coords[3],
          this.radius + 2 + width,
          coords[0],
          coords[1],
          coords[2],
          coords[3],
          this.radius + 2,
          coords[1],
          coords[0],
          color
        );
      } else {
        co.beginPath();
        co.strokeStyle = prop['chart.highlight.style.twod.stroke'];
        co.fillStyle = prop['chart.highlight.style.twod.fill'];
        if (prop['chart.variant'].indexOf('donut') > -1) {
          co.arc(shape['x'], shape['y'], shape['radius'], shape['angle.start'], shape['angle.end'], false);
          co.arc(
            shape['x'],
            shape['y'],
            typeof prop['chart.variant.donut.width'] == 'number'
              ? this.radius - prop['chart.variant.donut.width']
              : shape['radius'] / 2,
            shape['angle.end'],
            shape['angle.start'],
            true
          );
        } else {
          co.arc(shape['x'], shape['y'], shape['radius'] + 1, shape['angle.start'], shape['angle.end'], false);
          co.lineTo(shape['x'], shape['y']);
        }
        co.closePath();
        co.stroke();
        co.fill();
      }
    }
  };
  this.getObjectByXY = function(e) {
    if (this.getShape(e)) {
      return this;
    }
  };
  this.drawCenterpin = this.DrawCenterpin = function() {
    if (typeof prop['chart.centerpin'] == 'number' && prop['chart.centerpin'] > 0) {
      var cx = this.centerx;
      var cy = this.centery;
      co.beginPath();
      co.strokeStyle = prop['chart.centerpin.stroke'] ? prop['chart.centerpin.stroke'] : prop['chart.strokestyle'];
      co.fillStyle = prop['chart.centerpin.fill'] ? prop['chart.centerpin.fill'] : prop['chart.strokestyle'];
      co.moveTo(cx, cy);
      co.arc(cx, cy, prop['chart.centerpin'], 0, RG.TWOPI, false);
      co.stroke();
      co.fill();
    }
  };
  this.drawInGraphLabels = this.DrawInGraphLabels = function() {
    var context = co;
    var cx = this.centerx;
    var cy = this.centery;
    var radius = prop['chart.labels.ingraph.radius'];
    if (radius <= 2 && radius > 0) {
      radiusFactor = radius;
    } else {
      radiusFactor = 0.5;
    }
    if (prop['chart.variant'] == 'donut') {
      var r = this.radius * (0.5 + radiusFactor * 0.5);
      if (typeof prop['chart.variant.donut.width'] == 'number') {
        var r = this.radius - prop['chart.variant.donut.width'] + prop['chart.variant.donut.width'] / 2;
      }
    } else {
      var r = this.radius * radiusFactor;
    }
    if (radius > 2) {
      r = radius;
    }
    for (var i = 0, len = this.angles.length; i < len; ++i) {
      if (typeof prop['chart.exploded'] == 'object' && typeof prop['chart.exploded'][i] == 'number') {
        var explosion = prop['chart.exploded'][i];
      } else if (typeof prop['chart.exploded'] == 'number') {
        var explosion = parseInt(prop['chart.exploded']);
      } else {
        var explosion = 0;
      }
      var angleStart = this.angles[i][0];
      var angleEnd = this.angles[i][1];
      var angleCenter = (angleEnd - angleStart) / 2 + angleStart;
      var coords = RG.getRadiusEndPoint(this.centerx, this.centery, angleCenter, r + (explosion ? explosion : 0));
      var x = coords[0];
      var y = coords[1];
      var text =
        prop['chart.labels.ingraph.specific'] && typeof prop['chart.labels.ingraph.specific'][i] == 'string'
          ? prop['chart.labels.ingraph.specific'][i]
          : RG.number_format(
              this,
              this.data[i],
              prop['chart.labels.ingraph.units.pre'],
              prop['chart.labels.ingraph.units.post']
            );
      if (text) {
        co.beginPath();
        var font =
          typeof prop['chart.labels.ingraph.font'] === 'string'
            ? prop['chart.labels.ingraph.font']
            : prop['chart.text.font'];
        var size =
          typeof prop['chart.labels.ingraph.size'] === 'number'
            ? prop['chart.labels.ingraph.size']
            : prop['chart.text.size'] + 2;
        co.fillStyle = prop['chart.labels.ingraph.color'] ? prop['chart.labels.ingraph.color'] : 'black';
        RG.Text2(this, {
          font: font,
          size: size,
          x: x,
          y: y,
          text: text,
          valign: 'center',
          halign: 'center',
          bounding: prop['chart.labels.ingraph.bounding'],
          'bounding.fill': prop['chart.labels.ingraph.bounding.fill'],
          tag: 'labels.ingraph'
        });
        co.stroke();
      }
    }
  };
  this.drawCenterLabel = function(label) {
    var font = prop['chart.labels.center.font'],
      size = prop['chart.labels.center.size'],
      color = prop['chart.labels.center.color'],
      unitsPre = prop['chart.labels.center.units.pre'],
      unitsPost = prop['chart.labels.center.units.post'],
      bold = prop['chart.labels.center.bold'],
      italic = prop['chart.labels.center.italic'];
    RG.text2(this, {
      color: color,
      bold: bold,
      italic: italic,
      font: font,
      size: size,
      x: this.centerx,
      y: this.centery,
      halign: 'center',
      valign: 'center',
      text: RG.numberFormat(this, label, unitsPre, unitsPost)
    });
  };
  this.getAngle = function(value) {
    if (value > this.total) {
      return null;
    }
    var angle = value / this.total * RG.TWOPI;
    angle += prop['chart.origin'];
    return angle;
  };
  this.parseColors = function() {
    if (this.original_colors.length === 0) {
      this.original_colors['chart.colors'] = RG.arrayClone(prop['chart.colors']);
      this.original_colors['chart.key.colors'] = RG.arrayClone(prop['chart.key.colors']);
      this.original_colors['chart.strokestyle'] = RG.arrayClone(prop['chart.strokestyle']);
      this.original_colors['chart.highlight.stroke'] = RG.arrayClone(prop['chart.highlight.stroke']);
      this.original_colors['chart.highlight.style.twod.fill'] = RG.arrayClone(prop['chart.highlight.style.twod.fill']);
      this.original_colors['chart.highlight.style.twod.stroke'] = RG.arrayClone(
        prop['chart.highlight.style.twod.stroke']
      );
      this.original_colors['chart.ingraph.bounding.fill'] = RG.arrayClone(prop['chart.ingraph.bounding.fill']);
      this.original_colors['chart.ingraph.color'] = RG.arrayClone(prop['chart.ingraph.color']);
    }
    for (var i = 0; i < prop['chart.colors'].length; ++i) {
      prop['chart.colors'][i] = this.parseSingleColorForGradient(prop['chart.colors'][i]);
    }
    var keyColors = prop['chart.key.colors'];
    if (keyColors) {
      for (var i = 0; i < keyColors.length; ++i) {
        keyColors[i] = this.parseSingleColorForGradient(keyColors[i]);
      }
    }
    prop['chart.strokestyle'] = this.parseSingleColorForGradient(prop['chart.strokestyle']);
    prop['chart.highlight.stroke'] = this.parseSingleColorForGradient(prop['chart.highlight.stroke']);
    prop['chart.highlight.style.twod.fill'] = this.parseSingleColorForGradient(prop['chart.highlight.style.twod.fill']);
    prop['chart.highlight.style.twod.stroke'] = this.parseSingleColorForGradient(
      prop['chart.highlight.style.twod.stroke']
    );
    prop['chart.labels.ingraph.bounding.fill'] = this.parseSingleColorForGradient(
      prop['chart.labels.ingraph.bounding.fill']
    );
    prop['chart.labels.ingraph.color'] = this.parseSingleColorForGradient(prop['chart.labels.ingraph.color']);
  };
  this.reset = function() {};
  this.parseSingleColorForGradient = function(color) {
    if (!color || typeof color != 'string') {
      return color;
    }
    if (color.match(/^gradient\((.*)\)$/i)) {
      var parts = RegExp.$1.split(':');
      if (prop['chart.variant'] == 'donut') {
        var radius_start =
          typeof prop['chart.variant.donut.width'] == 'number'
            ? this.radius - prop['chart.variant.donut.width']
            : this.radius / 2;
      } else {
        var radius_start = 0;
      }
      var grad = co.createRadialGradient(
        this.centerx,
        this.centery,
        radius_start,
        this.centerx,
        this.centery,
        Math.min(
          ca.width - prop['chart.gutter.left'] - prop['chart.gutter.right'],
          ca.height - prop['chart.gutter.top'] - prop['chart.gutter.bottom']
        ) / 2
      );
      var diff = 1 / (parts.length - 1);
      grad.addColorStop(0, RG.trim(parts[0]));
      for (var j = 1; j < parts.length; ++j) {
        grad.addColorStop(j * diff, RG.trim(parts[j]));
      }
    }
    return grad ? grad : color;
  };
  this.interactiveKeyHighlight = function(index) {
    if (this.angles && this.angles[index]) {
      var segment = this.angles[index];
      var x = segment[2];
      var y = segment[3];
      var start = segment[0];
      var end = segment[1];
      co.strokeStyle = prop['chart.key.interactive.highlight.chart.stroke'];
      co.fillStyle = prop['chart.key.interactive.highlight.chart.fill'];
      co.lineWidth = 2;
      co.lineJoin = 'bevel';
      co.beginPath();
      co.moveTo(x, y);
      co.arc(x, y, this.radius, start, end, false);
      co.closePath();
      co.fill();
      co.stroke();
    }
  };
  this.on = function(type, func) {
    if (type.substr(0, 2) !== 'on') {
      type = 'on' + type;
    }
    if (typeof this[type] !== 'function') {
      this[type] = func;
    } else {
      RG.addCustomEventListener(this, type, func);
    }
    return this;
  };
  this.firstDrawFunc = function() {};
  this.draw3d = function() {
    var scaleX = 1.5,
      depth = prop['chart.variant.threed.depth'],
      prop_shadow = prop['chart.shadow'],
      prop_labels = prop['chart.labels'],
      prop_labelsSticks = prop['chart.labels.sticks'];
    this.set({ labels: [], labelsSticks: false, strokestyle: 'rgba(0,0,0,0)' });
    this.set({ variant: this.get('variant').replace(/3d/, '') });
    this.context.setTransform(scaleX, 0, 0, 1, (ca.width * scaleX - ca.width) * -0.5, 0);
    for (var i = depth; i > 0; i -= 1) {
      this.set({ centeryAdjust: i });
      if (i === parseInt(depth / 2)) {
        this.set({ labels: prop_labels, labelsSticks: prop_labelsSticks });
      }
      if (i === 0) {
        this.set({ shadow: prop_shadow });
      }
      this.draw();
      this.set('shadow', false);
      if (i <= parseInt(depth / 2)) {
        this.set({ labels: [], labelsSticks: false });
      }
      if (i > 1) {
        if (prop['chart.variant'].indexOf('donut') !== -1) {
          for (var j = 0; j < this.angles.length; ++j) {
            pa2(co, [
              'b',
              'a',
              this.angles[j][2],
              this.angles[j][3],
              this.radius + 1,
              this.angles[j][0],
              this.angles[j][1] * prop['chart.effect.roundrobin.multiplier'],
              false,
              'a',
              this.angles[j][2],
              this.angles[j][3],
              this.radius / 2,
              this.angles[j][1] * prop['chart.effect.roundrobin.multiplier'],
              this.angles[j][0],
              true,
              'f',
              'rgba(0,0,0,0.15)'
            ]);
          }
        } else {
          for (var j = 0; j < this.angles.length; ++j) {
            pa2(co, [
              'b',
              'm',
              this.angles[j][2],
              this.angles[j][3],
              'a',
              this.angles[j][2],
              this.angles[j][3],
              this.radius + 1,
              this.angles[j][0],
              this.angles[j][1] * prop['chart.effect.roundrobin.multiplier'],
              false,
              'c',
              'f',
              'rgba(0,0,0,0.15)'
            ]);
          }
        }
      }
    }
    this.set({
      variant: this.get('variant') + '3d',
      shadow: prop_shadow,
      labels: prop_labels,
      labelsSticks: prop_labelsSticks
    });
    return this;
  };
  this.explode = function() {
    var obj = this;
    var opt = arguments[0] ? arguments[0] : {};
    var callback = arguments[1] ? arguments[1] : function() {};
    var frames = opt.frames ? opt.frames : 30;
    var frame = 0;
    var maxExplode = Number(typeof opt.radius === 'number' ? opt.radius : ma.max(ca.width, ca.height));
    var currentExplode = Number(obj.get('exploded')) || 0;
    var step = (maxExplode - currentExplode) / frames;
    var iterator = function() {
      obj.set('exploded', currentExplode + step * frame);
      RGraph.clear(obj.canvas);
      RGraph.redrawCanvas(obj.canvas);
      if (frame++ < frames) {
        RGraph.Effects.updateCanvas(iterator);
      } else {
        callback(obj);
      }
    };
    iterator();
    return this;
  };
  this.grow = function() {
    var obj = this;
    var canvas = obj.canvas;
    var opt = arguments[0] ? arguments[0] : {};
    var frames = opt.frames || 30;
    var frame = 0;
    var callback = arguments[1] ? arguments[1] : function() {};
    var radius = obj.getRadius();
    prop['chart.radius'] = 0;
    var iterator = function() {
      obj.set('chart.radius', frame / frames * radius);
      RG.redrawCanvas(ca);
      if (frame++ < frames) {
        RG.Effects.updateCanvas(iterator);
      } else {
        RG.redrawCanvas(obj.canvas);
        callback(obj);
      }
    };
    iterator();
    return this;
  };
  this.roundrobin = this.roundRobin = function() {
    var obj = this,
      opt = arguments[0] || {},
      callback = arguments[1] || function() {},
      frame = 0,
      frames = opt.frames || 30,
      radius = obj.getRadius(),
      labels = obj.get('labels');
    obj.Set('chart.events', false);
    obj.Set('chart.labels', []);
    var iterator = function() {
      obj.set('effect.roundrobin.multiplier', RG.Effects.getEasingMultiplier(frames, frame));
      RGraph.redrawCanvas(ca);
      if (frame++ < frames) {
        RGraph.Effects.updateCanvas(iterator);
      } else {
        obj.set({ events: true, labels: labels });
        RG.redrawCanvas(obj.canvas);
        callback(obj);
      }
    };
    iterator();
    return this;
  };
  RG.att(ca);
  this.implode = function() {
    var obj = this,
      opt = arguments[0] || {},
      callback = arguments[1] || function() {},
      frames = opt.frames || 30,
      frame = 0,
      explodedMax = ma.max(ca.width, ca.height),
      exploded = explodedMax;
    function iterator() {
      exploded = explodedMax - frame / frames * explodedMax;
      obj.Set('exploded', exploded);
      RG.clear(ca);
      RG.redrawCanvas(ca);
      if (frame++ < frames) {
        RG.Effects.updateCanvas(iterator);
      } else {
        RG.clear(obj.canvas);
        RG.redrawCanvas(obj.canvas);
        callback(obj);
      }
    }
    iterator();
    return this;
  };
  RG.register(this);
  if (parseConfObjectForOptions) {
    RG.parseObjectStyleConfig(this, conf.options);
  }
};