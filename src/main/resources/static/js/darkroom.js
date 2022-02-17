// **이미지 데이터 전역변수
let snapshot_data;
!(function () {
  "use strict";
  var element = document.createElement("div");
  (element.id = "darkroom-icons"),
    (element.style.height = 0),
    (element.style.width = 0),
    (element.style.position = "absolute"),
    (element.style.visibility = "hidden"),
    (element.innerHTML =
      '<!-- inject:svg --><svg xmlns="http://www.w3.org/2000/svg"><symbol id="close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></symbol><symbol id="crop" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"/></symbol><symbol id="done" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol><symbol id="redo" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></symbol><symbol id="rotate-left" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/></symbol><symbol id="rotate-right" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/></symbol><symbol id="save" viewBox="1 0 21 20"><path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/></symbol><symbol id="undo" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></symbol></svg><!-- endinject -->'),
    document.body.appendChild(element);
})(),
  (function () {
    "use strict";
    function Darkroom(element, options, plugins) {
      return this.constructor(element, options, plugins);
    }
    (window.Darkroom = Darkroom),
      (Darkroom.plugins = []),
      (Darkroom.prototype = {
        containerElement: null,
        canvas: null,
        image: null,
        sourceCanvas: null,
        sourceImage: null,
        originalImageElement: null,
        transformations: [],
        defaults: { minWidth: null, minHeight: null, maxWidth: null, maxHeight: null, ratio: null, backgroundColor: "#fff", plugins: {}, initialize: function () {} },
        plugins: {},
        options: {},
        constructor: function (element, options, plugins) {
          if (((this.options = Darkroom.Utils.extend(options, this.defaults)), "string" == typeof element && (element = document.querySelector(element)), null !== element)) {
            var image = new Image();
            (image.onload = function () {
              this._initializeDOM(element),
                this._initializeImage(),
                this._initializePlugins(Darkroom.plugins),
                this.refresh(
                  function () {
                    this.options.initialize.bind(this).call();
                  }.bind(this)
                );
            }.bind(this)),
              (image.src = element.src);
          }
        },
        selfDestroy: function () {
          var container = this.containerElement,
            image = new Image();
          (image.onload = function () {
            container.parentNode.replaceChild(image, container);
          }),
            (image.src = this.sourceImage.toDataURL());
        },
        addEventListener: function (eventName, callback) {
          var el = this.canvas.getElement();
          el.addEventListener ? el.addEventListener(eventName, callback) : el.attachEvent && el.attachEvent("on" + eventName, callback);
        },
        dispatchEvent: function (eventName) {
          var event = document.createEvent("Event");
          event.initEvent(eventName, !0, !0), this.canvas.getElement().dispatchEvent(event);
        },
        refresh: function (next) {
          var clone = new Image();
          (clone.onload = function () {
            this._replaceCurrentImage(new fabric.Image(clone)), next && next();
          }.bind(this)),
            (clone.src = this.sourceImage.toDataURL());
        },
        _replaceCurrentImage: function (newImage) {
          this.image && this.image.remove(), (this.image = newImage), (this.image.selectable = !1);
          var viewport = Darkroom.Utils.computeImageViewPort(this.image),
            canvasWidth = viewport.width,
            canvasHeight = viewport.height;
          if (null !== this.options.ratio) {
            var canvasRatio = +this.options.ratio,
              currentRatio = canvasWidth / canvasHeight;
            currentRatio > canvasRatio ? (canvasHeight = canvasWidth / canvasRatio) : canvasRatio > currentRatio && (canvasWidth = canvasHeight * canvasRatio);
          }
          var scaleMin = 1,
            scaleMax = 1,
            scaleX = 1,
            scaleY = 1;
          null !== this.options.maxWidth && this.options.maxWidth < canvasWidth && (scaleX = this.options.maxWidth / canvasWidth),
            null !== this.options.maxHeight && this.options.maxHeight < canvasHeight && (scaleY = this.options.maxHeight / canvasHeight),
            (scaleMin = Math.min(scaleX, scaleY)),
            (scaleX = 1),
            (scaleY = 1),
            null !== this.options.minWidth && this.options.minWidth > canvasWidth && (scaleX = this.options.minWidth / canvasWidth),
            null !== this.options.minHeight && this.options.minHeight > canvasHeight && (scaleY = this.options.minHeight / canvasHeight),
            (scaleMax = Math.max(scaleX, scaleY));
          var scale = scaleMax * scaleMin;
          (canvasWidth *= scale),
            (canvasHeight *= scale),
            this.image.setScaleX(1 * scale),
            this.image.setScaleY(1 * scale),
            this.canvas.add(this.image),
            // this.canvas.setWidth(canvasWidth),
            // this.canvas.setHeight(canvasHeight),
            this.canvas.setWidth(580)
            this.canvas.setHeight(360),
            this.canvas.centerObject(this.image),
            this.image.setCoords();
        },
        applyTransformation: function (transformation) {
          this.transformations.push(transformation), transformation.applyTransformation(this.sourceCanvas, this.sourceImage, this._postTransformation.bind(this));
        },
        _postTransformation: function (newImage) {
          newImage && (this.sourceImage = newImage),
            this.refresh(
              function () {
                this.dispatchEvent("core:transformation");
              }.bind(this)
            );
        },
        reinitializeImage: function () {
          this.sourceImage.remove(), this._initializeImage(), this._popTransformation(this.transformations.slice());
        },
        _popTransformation: function (transformations) {
          if (0 === transformations.length) return this.dispatchEvent("core:reinitialized"), void this.refresh();
          var transformation = transformations.shift(),
            next = function (newImage) {
              newImage && (this.sourceImage = newImage), this._popTransformation(transformations);
            };
          transformation.applyTransformation(this.sourceCanvas, this.sourceImage, next.bind(this));
        },
        _initializeDOM: function (imageElement) {
          var mainContainerElement = document.createElement("div");
          mainContainerElement.className = "darkroom-container";
          mainContainerElement.id = "darkroom-container-id";
          var toolbarElement = document.createElement("div");
          (toolbarElement.className = "darkroom-toolbar"),
          (toolbarElement.id = "darkroom-toolbar-id"),
          mainContainerElement.appendChild(toolbarElement);
          var canvasContainerElement = document.createElement("div");
          canvasContainerElement.className = "darkroom-image-container";
          var canvasElement = document.createElement("canvas");
          canvasContainerElement.appendChild(canvasElement), mainContainerElement.appendChild(canvasContainerElement);
          var sourceCanvasContainerElement = document.createElement("div");
          (sourceCanvasContainerElement.className = "darkroom-source-container"), (sourceCanvasContainerElement.style.display = "none");
          var sourceCanvasElement = document.createElement("canvas");
          sourceCanvasContainerElement.appendChild(sourceCanvasElement),
            mainContainerElement.appendChild(sourceCanvasContainerElement),
            imageElement.parentNode.replaceChild(mainContainerElement, imageElement),
            (imageElement.style.display = "none"),
            mainContainerElement.appendChild(imageElement),
            (this.containerElement = mainContainerElement),
            (this.originalImageElement = imageElement),
            (this.toolbar = new Darkroom.UI.Toolbar(toolbarElement)),
            (this.canvas = new fabric.Canvas(canvasElement, { selection: !1, backgroundColor: this.options.backgroundColor })),
            (this.sourceCanvas = new fabric.Canvas(sourceCanvasElement, { selection: !1, backgroundColor: this.options.backgroundColor }));
        },
        _initializeImage: function () {
          (this.sourceImage = new fabric.Image(this.originalImageElement, {
            selectable: !1,
            evented: !1,
            lockMovementX: !0,
            lockMovementY: !0,
            lockRotation: !0,
            lockScalingX: !0,
            lockScalingY: !0,
            lockUniScaling: !0,
            hasControls: !1,
            hasBorders: !1,
          })),
            this.sourceCanvas.add(this.sourceImage);
          var viewport = Darkroom.Utils.computeImageViewPort(this.sourceImage),
            canvasWidth = viewport.width,
            canvasHeight = viewport.height;
          this.sourceCanvas.setWidth(canvasWidth), this.sourceCanvas.setHeight(canvasHeight), this.sourceCanvas.centerObject(this.sourceImage), this.sourceImage.setCoords();
        },
        _initializePlugins: function (plugins) {
          for (var name in plugins) {
            var plugin = plugins[name],
              options = this.options.plugins[name];
            options !== !1 && plugins.hasOwnProperty(name) && (this.plugins[name] = new plugin(this, options));
          }
        },
      });
  })(),
  (function () {
    "use strict";
    function Plugin(darkroom, options) {
      (this.darkroom = darkroom), (this.options = Darkroom.Utils.extend(options, this.defaults)), this.initialize();
    }
    (Darkroom.Plugin = Plugin),
      (Plugin.prototype = { defaults: {}, initialize: function () {} }),
      (Plugin.extend = function (protoProps) {
        var child,
          parent = this;
        (child =
          protoProps && protoProps.hasOwnProperty("constructor")
            ? protoProps.constructor
            : function () {
                return parent.apply(this, arguments);
              }),
          Darkroom.Utils.extend(child, parent);
        var Surrogate = function () {
          this.constructor = child;
        };
        return (
          (Surrogate.prototype = parent.prototype), (child.prototype = new Surrogate()), protoProps && Darkroom.Utils.extend(child.prototype, protoProps), (child.__super__ = parent.prototype), child
        );
      });
  })(),
  (function () {
    "use strict";
    function Transformation(options) {
      this.options = options;
    }
    (Darkroom.Transformation = Transformation),
      (Transformation.prototype = { applyTransformation: function (image) {} }),
      (Transformation.extend = function (protoProps) {
        var child,
          parent = this;
        (child =
          protoProps && protoProps.hasOwnProperty("constructor")
            ? protoProps.constructor
            : function () {
                return parent.apply(this, arguments);
              }),
          Darkroom.Utils.extend(child, parent);
        var Surrogate = function () {
          this.constructor = child;
        };
        return (
          (Surrogate.prototype = parent.prototype), (child.prototype = new Surrogate()), protoProps && Darkroom.Utils.extend(child.prototype, protoProps), (child.__super__ = parent.prototype), child
        );
      });
  })(),
  (function () {
    "use strict";
    function Toolbar(element) {
      this.element = element;
    }
    function ButtonGroup(element) {
      this.element = element;
    }
    function Button(element) {
      this.element = element;
    }
    (Darkroom.UI = { Toolbar: Toolbar, ButtonGroup: ButtonGroup, Button: Button }),
      (Toolbar.prototype = {
        createButtonGroup: function (options) {
          var buttonGroup = document.createElement("div");
          return (buttonGroup.className = "darkroom-button-group"), this.element.appendChild(buttonGroup), new ButtonGroup(buttonGroup);
        },
      }),
      (ButtonGroup.prototype = {
        createButton: function (options) {
          var defaults = { image: "help", type: "default", group: "default", hide: !1, disabled: !1 };
          options = Darkroom.Utils.extend(options, defaults);
          var buttonElement = document.createElement("button");
          (buttonElement.type = "button"),
            (buttonElement.className = "darkroom-button darkroom-button-" + options.type),
            (buttonElement.innerHTML = '<svg class="darkroom-icon"><use xlink:href="#' + options.image + '" /></svg>'),
            this.element.appendChild(buttonElement);
          var button = new Button(buttonElement);
          return button.hide(options.hide), button.disable(options.disabled), button;
        },
      }),
      (Button.prototype = {
        addEventListener: function (eventName, listener) {
          this.element.addEventListener ? this.element.addEventListener(eventName, listener) : this.element.attachEvent && this.element.attachEvent("on" + eventName, listener);
        },
        removeEventListener: function (eventName, listener) {
          this.element.removeEventListener && this.element.removeEventListener(eventName, listener);
        },
        active: function (value) {
          value ? this.element.classList.add("darkroom-button-active") : this.element.classList.remove("darkroom-button-active");
        },
        hide: function (value) {
          value ? this.element.classList.add("darkroom-button-hidden") : this.element.classList.remove("darkroom-button-hidden");
        },
        disable: function (value) {
          this.element.disabled = value ? !0 : !1;
        },
      });
  })(),
  (function () {
    "use strict";
    function extend(b, a) {
      var prop;
      if (void 0 === b) return a;
      for (prop in a) a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === !1 && (b[prop] = a[prop]);
      return b;
    }
    function computeImageViewPort(image) {
      return {
        height: Math.abs(image.getWidth() * Math.sin((image.getAngle() * Math.PI) / 180)) + Math.abs(image.getHeight() * Math.cos((image.getAngle() * Math.PI) / 180)),
        width: Math.abs(image.getHeight() * Math.sin((image.getAngle() * Math.PI) / 180)) + Math.abs(image.getWidth() * Math.cos((image.getAngle() * Math.PI) / 180)),
      };
    }
    Darkroom.Utils = { extend: extend, computeImageViewPort: computeImageViewPort };
  })(),
  (function (window, document, Darkroom, fabric) {
    "use strict";
    Darkroom.plugins.history = Darkroom.Plugin.extend({
      undoTransformations: [],
      initialize: function () {
        this._initButtons(), this.darkroom.addEventListener("core:transformation", this._onTranformationApplied.bind(this));
      },
      undo: function () {
        if (0 !== this.darkroom.transformations.length) {
          var lastTransformation = this.darkroom.transformations.pop();
          this.undoTransformations.unshift(lastTransformation), this.darkroom.reinitializeImage(), this._updateButtons();
        }
      },
      redo: function () {
        if (0 !== this.undoTransformations.length) {
          var cancelTransformation = this.undoTransformations.shift();
          this.darkroom.transformations.push(cancelTransformation), this.darkroom.reinitializeImage(), this._updateButtons();
        }
      },
      _initButtons: function () {
        var buttonGroup = this.darkroom.toolbar.createButtonGroup();
        return (
          (this.backButton = buttonGroup.createButton({ image: "undo", disabled: !0 })),
          (this.forwardButton = buttonGroup.createButton({ image: "redo", disabled: !0 })),
          this.backButton.addEventListener("click", this.undo.bind(this)),
          this.forwardButton.addEventListener("click", this.redo.bind(this)),
          this
        );
      },
      _updateButtons: function () {
        this.backButton.disable(0 === this.darkroom.transformations.length), this.forwardButton.disable(0 === this.undoTransformations.length);
      },
      _onTranformationApplied: function () {
        (this.undoTransformations = []), this._updateButtons();
      },
    });
  })(window, document, Darkroom, fabric),
  (function () {
    "use strict";
    var Rotation = Darkroom.Transformation.extend({
      applyTransformation: function (canvas, image, next) {
        var angle = (image.getAngle() + this.options.angle) % 360;
        image.rotate(angle);
        var width, height;
        (height = Math.abs(image.getWidth() * Math.sin((angle * Math.PI) / 180)) + Math.abs(image.getHeight() * Math.cos((angle * Math.PI) / 180))),
          (width = Math.abs(image.getHeight() * Math.sin((angle * Math.PI) / 180)) + Math.abs(image.getWidth() * Math.cos((angle * Math.PI) / 180))),
          canvas.setWidth(width),
          canvas.setHeight(height),
          canvas.centerObject(image),
          image.setCoords(),
          canvas.renderAll(),
          next();
      },
    });
    Darkroom.plugins.rotate = Darkroom.Plugin.extend({
      initialize: function () {
        var buttonGroup = this.darkroom.toolbar.createButtonGroup(),
          leftButton = buttonGroup.createButton({ image: "rotate-left" }),
          rightButton = buttonGroup.createButton({ image: "rotate-right" });
        leftButton.addEventListener("click", this.rotateLeft.bind(this)), rightButton.addEventListener("click", this.rotateRight.bind(this));
      },
      rotateLeft: function () {
        this.rotate(-90);
      },
      rotateRight: function () {
        this.rotate(90);
      },
      rotate: function (angle) {
        this.darkroom.applyTransformation(new Rotation({ angle: angle }));
      },
    });
  })(),
  (function () {
    "use strict";
    var Crop = Darkroom.Transformation.extend({
        applyTransformation: function (canvas, image, next) {
          var snapshot = new Image();
          snapshot.onload = function () {
            if (!(1 > height || 1 > width)) {
              var imgInstance = new fabric.Image(this, {
                  selectable: !1,
                  evented: !1,
                  lockMovementX: !0,
                  lockMovementY: !0,
                  lockRotation: !0,
                  lockScalingX: !0,
                  lockScalingY: !0,
                  lockUniScaling: !0,
                  hasControls: !1,
                  hasBorders: !1,
                }),
                width = this.width,
                height = this.height;
              canvas.setWidth(width), canvas.setHeight(height), image.remove(), canvas.add(imgInstance), next(imgInstance);
            }
          };
          var viewport = Darkroom.Utils.computeImageViewPort(image),
            imageWidth = viewport.width,
            imageHeight = viewport.height,
            left = this.options.left * imageWidth,
            top = this.options.top * imageHeight,
            width = Math.min(this.options.width * imageWidth, imageWidth - left),
            height = Math.min(this.options.height * imageHeight, imageHeight - top);
          snapshot.src = canvas.toDataURL({ left: left, top: top, width: width, height: height });
          snapshot_data = snapshot.src;
        },

      }),
      CropZone = fabric.util.createClass(fabric.Rect, {
        _render: function (ctx) {
          this.callSuper("_render", ctx);
          var dashWidth = (ctx.canvas, 7),
            flipX = this.flipX ? -1 : 1,
            flipY = this.flipY ? -1 : 1,
            scaleX = flipX / this.scaleX,
            scaleY = flipY / this.scaleY;
          ctx.scale(scaleX, scaleY),
            (ctx.fillStyle = "rgba(0, 0, 0, 0.5)"),
            this._renderOverlay(ctx),
            void 0 !== ctx.setLineDash ? ctx.setLineDash([dashWidth, dashWidth]) : void 0 !== ctx.mozDash && (ctx.mozDash = [dashWidth, dashWidth]),
            (ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"),
            this._renderBorders(ctx),
            this._renderGrid(ctx),
            (ctx.lineDashOffset = dashWidth),
            (ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"),
            this._renderBorders(ctx),
            this._renderGrid(ctx),
            ctx.scale(1 / scaleX, 1 / scaleY);
        },
        _renderOverlay: function (ctx) {
          var canvas = ctx.canvas,
            borderOffset = 0,
            x0 = Math.ceil(-this.getWidth() / 2 - this.getLeft()),
            x1 = Math.ceil(-this.getWidth() / 2),
            x2 = Math.ceil(this.getWidth() / 2),
            x3 = Math.ceil(this.getWidth() / 2 + (canvas.width - this.getWidth() - this.getLeft())),
            y0 = Math.ceil(-this.getHeight() / 2 - this.getTop()),
            y1 = Math.ceil(-this.getHeight() / 2),
            y2 = Math.ceil(this.getHeight() / 2),
            y3 = Math.ceil(this.getHeight() / 2 + (canvas.height - this.getHeight() - this.getTop()));
          ctx.fillRect(x0, y0, x3 - x0, y1 - y0 + borderOffset),
            ctx.fillRect(x0, y1, x1 - x0, y2 - y1 + borderOffset),
            ctx.fillRect(x2, y1, x3 - x2, y2 - y1 + borderOffset),
            ctx.fillRect(x0, y2, x3 - x0, y3 - y2);
        },
        _renderBorders: function (ctx) {
          ctx.beginPath(),
            ctx.moveTo(-this.getWidth() / 2, -this.getHeight() / 2),
            ctx.lineTo(this.getWidth() / 2, -this.getHeight() / 2),
            ctx.lineTo(this.getWidth() / 2, this.getHeight() / 2),
            ctx.lineTo(-this.getWidth() / 2, this.getHeight() / 2),
            ctx.lineTo(-this.getWidth() / 2, -this.getHeight() / 2),
            ctx.stroke();
        },
        _renderGrid: function (ctx) {
          ctx.beginPath(),
            ctx.moveTo(-this.getWidth() / 2 + (1 / 3) * this.getWidth(), -this.getHeight() / 2),
            ctx.lineTo(-this.getWidth() / 2 + (1 / 3) * this.getWidth(), this.getHeight() / 2),
            ctx.stroke(),
            ctx.beginPath(),
            ctx.moveTo(-this.getWidth() / 2 + (2 / 3) * this.getWidth(), -this.getHeight() / 2),
            ctx.lineTo(-this.getWidth() / 2 + (2 / 3) * this.getWidth(), this.getHeight() / 2),
            ctx.stroke(),
            ctx.beginPath(),
            ctx.moveTo(-this.getWidth() / 2, -this.getHeight() / 2 + (1 / 3) * this.getHeight()),
            ctx.lineTo(this.getWidth() / 2, -this.getHeight() / 2 + (1 / 3) * this.getHeight()),
            ctx.stroke(),
            ctx.beginPath(),
            ctx.moveTo(-this.getWidth() / 2, -this.getHeight() / 2 + (2 / 3) * this.getHeight()),
            ctx.lineTo(this.getWidth() / 2, -this.getHeight() / 2 + (2 / 3) * this.getHeight()),
            ctx.stroke();
        },
      });
    Darkroom.plugins.crop = Darkroom.Plugin.extend({
      startX: null,
      startY: null,
      isKeyCroping: !1,
      isKeyLeft: !1,
      isKeyUp: !1,
      defaults: { minHeight: 1, minWidth: 1, ratio: null, quickCropKey: !1 },
      initialize: function () {
        var buttonGroup = this.darkroom.toolbar.createButtonGroup();
        (this.cropButton = buttonGroup.createButton({ image: "crop" })),
          (this.okButton = buttonGroup.createButton({ image: "done", type: "success", hide: !0 })),
          (this.cancelButton = buttonGroup.createButton({ image: "close", type: "danger", hide: !0 })),
          this.cropButton.addEventListener("click", this.toggleCrop.bind(this)),
          this.okButton.addEventListener("click", this.cropCurrentZone.bind(this)),
          this.cancelButton.addEventListener("click", this.releaseFocus.bind(this)),
          this.darkroom.canvas.on("mouse:down", this.onMouseDown.bind(this)),
          this.darkroom.canvas.on("mouse:move", this.onMouseMove.bind(this)),
          this.darkroom.canvas.on("mouse:up", this.onMouseUp.bind(this)),
          this.darkroom.canvas.on("object:moving", this.onObjectMoving.bind(this)),
          this.darkroom.canvas.on("object:scaling", this.onObjectScaling.bind(this)),
          fabric.util.addListener(fabric.document, "keydown", this.onKeyDown.bind(this)),
          fabric.util.addListener(fabric.document, "keyup", this.onKeyUp.bind(this)),
          this.darkroom.addEventListener("core:transformation", this.releaseFocus.bind(this));
      },
      onObjectMoving: function (event) {
        if (this.hasFocus()) {
          var currentObject = event.target;
          if (currentObject === this.cropZone) {
            var canvas = this.darkroom.canvas,
              x = currentObject.getLeft(),
              y = currentObject.getTop(),
              w = currentObject.getWidth(),
              h = currentObject.getHeight(),
              maxX = canvas.getWidth() - w,
              maxY = canvas.getHeight() - h;
            0 > x && currentObject.set("left", 0),
              0 > y && currentObject.set("top", 0),
              x > maxX && currentObject.set("left", maxX),
              y > maxY && currentObject.set("top", maxY),
              this.darkroom.dispatchEvent("crop:update");
          }
        }
      },
      onObjectScaling: function (event) {
        if (this.hasFocus()) {
          var preventScaling = !1,
            currentObject = event.target;
          if (currentObject === this.cropZone) {
            var canvas = this.darkroom.canvas,
              pointer = canvas.getPointer(event.e),
              minX = (pointer.x, pointer.y, currentObject.getLeft()),
              minY = currentObject.getTop(),
              maxX = currentObject.getLeft() + currentObject.getWidth(),
              maxY = currentObject.getTop() + currentObject.getHeight();
            if (
              (null !== this.options.ratio && (0 > minX || maxX > canvas.getWidth() || 0 > minY || maxY > canvas.getHeight()) && (preventScaling = !0),
              0 > minX || maxX > canvas.getWidth() || preventScaling)
            ) {
              var lastScaleX = this.lastScaleX || 1;
              currentObject.setScaleX(lastScaleX);
            }
            if ((0 > minX && currentObject.setLeft(0), 0 > minY || maxY > canvas.getHeight() || preventScaling)) {
              var lastScaleY = this.lastScaleY || 1;
              currentObject.setScaleY(lastScaleY);
            }
            0 > minY && currentObject.setTop(0),
              currentObject.getWidth() < this.options.minWidth && currentObject.scaleToWidth(this.options.minWidth),
              currentObject.getHeight() < this.options.minHeight && currentObject.scaleToHeight(this.options.minHeight),
              (this.lastScaleX = currentObject.getScaleX()),
              (this.lastScaleY = currentObject.getScaleY()),
              this.darkroom.dispatchEvent("crop:update");
          }
        }
      },
      onMouseDown: function (event) {
        if (this.hasFocus()) {
          var canvas = this.darkroom.canvas;
          canvas.calcOffset();
          var pointer = canvas.getPointer(event.e),
            x = pointer.x,
            y = pointer.y,
            point = new fabric.Point(x, y),
            activeObject = canvas.getActiveObject();
          activeObject === this.cropZone ||
            this.cropZone.containsPoint(point) ||
            (canvas.discardActiveObject(), this.cropZone.setWidth(0), this.cropZone.setHeight(0), this.cropZone.setScaleX(1), this.cropZone.setScaleY(1), (this.startX = x), (this.startY = y));
        }
      },
      onMouseMove: function (event) {
        if (this.isKeyCroping) return this.onMouseMoveKeyCrop(event);
        if (null !== this.startX && null !== this.startY) {
          var canvas = this.darkroom.canvas,
            pointer = canvas.getPointer(event.e),
            x = pointer.x,
            y = pointer.y;
          this._renderCropZone(this.startX, this.startY, x, y);
        }
      },
      onMouseMoveKeyCrop: function (event) {
        var canvas = this.darkroom.canvas,
          zone = this.cropZone,
          pointer = canvas.getPointer(event.e),
          x = pointer.x,
          y = pointer.y;
        (zone.left && zone.top) || (zone.setTop(y), zone.setLeft(x)),
          (this.isKeyLeft = x < zone.left + zone.width / 2),
          (this.isKeyUp = y < zone.top + zone.height / 2),
          this._renderCropZone(Math.min(zone.left, x), Math.min(zone.top, y), Math.max(zone.left + zone.width, x), Math.max(zone.top + zone.height, y));
      },
      onMouseUp: function (event) {
        if (null !== this.startX && null !== this.startY) {
          var canvas = this.darkroom.canvas;
          this.cropZone.setCoords(), canvas.setActiveObject(this.cropZone), canvas.calcOffset(), (this.startX = null), (this.startY = null);
        }
      },
      onKeyDown: function (event) {
        !1 === this.options.quickCropKey ||
          event.keyCode !== this.options.quickCropKey ||
          this.isKeyCroping ||
          ((this.isKeyCroping = !0),
          this.darkroom.canvas.discardActiveObject(),
          this.cropZone.setWidth(0),
          this.cropZone.setHeight(0),
          this.cropZone.setScaleX(1),
          this.cropZone.setScaleY(1),
          this.cropZone.setTop(0),
          this.cropZone.setLeft(0));
      },
      onKeyUp: function (event) {
        !1 !== this.options.quickCropKey && event.keyCode === this.options.quickCropKey && this.isKeyCroping && ((this.isKeyCroping = !1), (this.startX = 1), (this.startY = 1), this.onMouseUp());
      },
      selectZone: function (x, y, width, height, forceDimension) {
        this.hasFocus() || this.requireFocus(), forceDimension ? this.cropZone.set({ left: x, top: y, width: width, height: height }) : this._renderCropZone(x, y, x + width, y + height);
        var canvas = this.darkroom.canvas;
        canvas.bringToFront(this.cropZone), this.cropZone.setCoords(), canvas.setActiveObject(this.cropZone), canvas.calcOffset(), this.darkroom.dispatchEvent("crop:update");
      },
      toggleCrop: function () {
        this.hasFocus() ? this.releaseFocus() : this.requireFocus();
      },
      cropCurrentZone: function () {
        if (this.hasFocus() && !(this.cropZone.width < 1 && this.cropZone.height < 1)) {
          var image = this.darkroom.image,
            top = this.cropZone.getTop() - image.getTop(),
            left = this.cropZone.getLeft() - image.getLeft(),
            width = this.cropZone.getWidth(),
            height = this.cropZone.getHeight();
          0 > top && ((height += top), (top = 0)),
            0 > left && ((width += left), (left = 0)),
            this.darkroom.applyTransformation(new Crop({ top: top / image.getHeight(), left: left / image.getWidth(), width: width / image.getWidth(), height: height / image.getHeight() }));
        }
      },
      hasFocus: function () {
        return void 0 !== this.cropZone;
      },
      requireFocus: function () {
        (this.cropZone = new CropZone({
          fill: "transparent",
          hasBorders: !1,
          originX: "left",
          originY: "top",
          cornerColor: "#444",
          cornerSize: 8,
          transparentCorners: !1,
          lockRotation: !0,
          hasRotatingPoint: !1,
        })),
          null !== this.options.ratio && this.cropZone.set("lockUniScaling", !0),
          this.darkroom.canvas.add(this.cropZone),
          (this.darkroom.canvas.defaultCursor = "crosshair"),
          this.cropButton.active(!0),
          this.okButton.hide(!1),
          this.cancelButton.hide(!1);
      },
      releaseFocus: function () {
        void 0 !== this.cropZone &&
          (this.cropZone.remove(),
          (this.cropZone = void 0),
          this.cropButton.active(!1),
          this.okButton.hide(!0),
          this.cancelButton.hide(!0),
          (this.darkroom.canvas.defaultCursor = "default"),
          this.darkroom.dispatchEvent("crop:update"));
      },
      _renderCropZone: function (fromX, fromY, toX, toY) {
        var canvas = this.darkroom.canvas,
          isRight = toX > fromX,
          isLeft = !isRight,
          isDown = toY > fromY,
          isUp = !isDown,
          minWidth = Math.min(+this.options.minWidth, canvas.getWidth()),
          minHeight = Math.min(+this.options.minHeight, canvas.getHeight()),
          leftX = Math.min(fromX, toX),
          rightX = Math.max(fromX, toX),
          topY = Math.min(fromY, toY),
          bottomY = Math.max(fromY, toY);
        (leftX = Math.max(0, leftX)),
          (rightX = Math.min(canvas.getWidth(), rightX)),
          (topY = Math.max(0, topY)),
          (bottomY = Math.min(canvas.getHeight(), bottomY)),
          minWidth > rightX - leftX && (isRight ? (rightX = leftX + minWidth) : (leftX = rightX - minWidth)),
          minHeight > bottomY - topY && (isDown ? (bottomY = topY + minHeight) : (topY = bottomY - minHeight)),
          0 > leftX && ((rightX += Math.abs(leftX)), (leftX = 0)),
          rightX > canvas.getWidth() && ((leftX -= rightX - canvas.getWidth()), (rightX = canvas.getWidth())),
          0 > topY && ((bottomY += Math.abs(topY)), (topY = 0)),
          bottomY > canvas.getHeight() && ((topY -= bottomY - canvas.getHeight()), (bottomY = canvas.getHeight()));
        var width = rightX - leftX,
          height = bottomY - topY,
          currentRatio = width / height;
        if (this.options.ratio && +this.options.ratio !== currentRatio) {
          var ratio = +this.options.ratio;
          if ((this.isKeyCroping && ((isLeft = this.isKeyLeft), (isUp = this.isKeyUp)), ratio > currentRatio)) {
            var newWidth = height * ratio;
            isLeft && (leftX -= newWidth - width), (width = newWidth);
          } else if (currentRatio > ratio) {
            var newHeight = height / ((ratio * height) / width);
            isUp && (topY -= newHeight - height), (height = newHeight);
          }
          if ((0 > leftX && (leftX = 0), 0 > topY && (topY = 0), leftX + width > canvas.getWidth())) {
            var newWidth = canvas.getWidth() - leftX;
            (height = (newWidth * height) / width), (width = newWidth), isUp && (topY = fromY - height);
          }
          if (topY + height > canvas.getHeight()) {
            var newHeight = canvas.getHeight() - topY;
            (width = (width * newHeight) / height), (height = newHeight), isLeft && (leftX = fromX - width);
          }
        }
        (this.cropZone.left = leftX),
          (this.cropZone.top = topY),
          (this.cropZone.width = width),
          (this.cropZone.height = height),
          this.darkroom.canvas.bringToFront(this.cropZone),
          this.darkroom.dispatchEvent("crop:update");
      },
    });
  })(),



// ***
  (function () {
    "use strict";
    Darkroom.plugins.save = Darkroom.Plugin.extend({
      defaults: {
        callback: function () {
          //   this.darkroom.selfDestroy();
          // **툴바 맨 마지막 버튼 누를 시 다크룸 컨테이너 삭제로 인한 초기화
          let save_button = document.getElementById("darkroom-toolbar-id").lastChild;
          save_button.addEventListener("click", function () {
            let darkromm_div=document.getElementById("darkroom-container-id");
            darkromm_div.remove();
            location.reload();
            // var darkroom_container_id = document.getElementById("darkroom-container-id").remove();
            // darkroom_container_id.remove();
          });
        },
        //이미지(png)로 다운로드
      },
      initialize: function () {
        var buttonGroup = this.darkroom.toolbar.createButtonGroup();
        (this.destroyButton = buttonGroup.createButton({ image: "save" })), this.destroyButton.addEventListener("click", this.options.callback.bind(this));
      },
    });
  })();

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}

function make_darkroom() {
  let dkrm = new Darkroom("#prev_View_area", {
    // Size options
    minWidth: 580,
    minHeight: 400,
    maxWidth: 580,
    maxHeight: 400,
    ratio: 4 / 3,
    backgroundColor: "#000",

    // Plugins options
    plugins: {
      //save: false,
      crop: {
        quickCropKey: 67, //key "c"
        //minHeight: 50,
        //minWidth: 50,
        //ratio: 4/3
      },
    },

    // Post initialize script
    initialize: function () {
      var cropPlugin = this.plugins["crop"];
      // cropPlugin.selectZone(170, 25, 300, 300);
      cropPlugin.requireFocus();
    },
  });
}


function getCookie(name) { // csrftoken 문제 해결 
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


// ** 폰트 검색 클릭 시 스냅샷 변수에 저장된 이미지 데이터 호출
$("#inputGroupFileAddon04").click(function (){
  if (snapshot_data==undefined){
    Swal.fire({
      icon: 'error',
      title:'이미지를 업로드해 주세요!',
      confirmButtonText: '확인',
      confirmButtonColor: 'black',
    })
  }else{
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/font_result/',
        data : {
            'snapshot_data':snapshot_data,
        },
        headers:{'X-CSRFToken':csrftoken},
        success: function(result) {
            console.log("result")
            console.log(result)
            $("#searchresult").html(result);
        }
    });
  }
});