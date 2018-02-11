
// Ventana emergente para preguntar si desea guardar el archivo trabajado
!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("object" == typeof exports) {
      factory(require("jquery"));
    } else {
      if (window.jQuery) {
        factory(window.jQuery);
      }
    }
  }
}(function($) {
  /**
   * @param {?} element
   * @param {?} content
   * @return {undefined}
   */
  var Modal = function(element, content) {
    var self = this;
    var $element = $(element);
    self._el = element;
    self._opt = content;
    /** @type {number} */
    self._type = 0;
    /** @type {number} */
    self._which = 0;
    self._locales = $element.data("locales").split(",");
    $element.on("show.bs.modal", $.proxy(self._show, self)).on("hidden.bs.modal", $.proxy(self._hidden, self)).on("shown.bs.modal", $.proxy(self._shown, self)).on("click", ".modal-footer .btn", $.proxy(self._click, self));
  };
  Modal.prototype = {
    /**
     * @param {?} message
     * @param {(Object|boolean|number|string)} text
     * @return {undefined}
     */
    alert : function(message, text) {
      var self = this;
      var element = self._el;
      var len = self._locales;
      $(".modal-title", element).text(text || len[0]);
      $(".modal-body p", element).html(message);
      /** @type {number} */
      self._type = 1;
      $(element).modal("show");
    },
    /**
     * @param {string} str
     * @param {Function} cb
     * @param {(Object|boolean|number|string)} message
     * @return {undefined}
     */
    confirm : function(str, cb, message) {
      var self = this;
      var element = self._el;
      var messages = self._locales;
      /** @type {number} */
      self._type = 3;
      /** @type {Function} */
      self._callback = cb;
      $(".modal-title", element).text(message || messages[1]);
      $(".modal-body p", element).html(str);
      $(element).modal("show");
    },
    /**
     * @param {?} value
     * @param {Function} callback
     * @param {(Object|boolean|number|string)} message
     * @param {string} text
     * @return {undefined}
     */
    prompt : function(value, callback, message, text) {
      var self = this;
      var element = self._el;
      var messages = self._locales;
      /** @type {number} */
      self._type = 4;
      /** @type {Function} */
      self._callback = callback;
      $(".modal-title", element).text(message || messages[2]);
      $(".modal-body label", element).text(text || "");
      $(".modal-body input", element).val(value);
      $(element).modal("show");
    },
    /**
     * @return {undefined}
     */
    _show : function() {
      var self = this;
      if (1 === (1 & self._type)) {
        $(".modal-body p", self._el).removeClass("hidden");
      } else {
        $(".modal-body p", self._el).addClass("hidden");
      }
      if (1 === self._type) {
        $(".modal-footer", self._el).addClass("hidden");
      } else {
        $(".modal-footer", self._el).removeClass("hidden");
      }
      if (4 === (4 & self._type)) {
        $(".modal-body .form-group", self._el).removeClass("hidden");
        $(".modal-footer .btn[data-which=-1]", self._el).addClass("hidden");
      } else {
        $(".modal-body .form-group", self._el).addClass("hidden");
        $(".modal-footer .btn[data-which=-1]", self._el).removeClass("hidden");
      }
    },
    /**
     * @return {undefined}
     */
    _shown : function() {
      var self = this;
      if (4 === (4 & self._type)) {
        $(".modal-body input", self._el).focus();
      }
    },
    /**
     * @return {undefined}
     */
    _hidden : function() {
      var self = this;
      var context = self._el;
      if ("function" == typeof self._callback) {
        var funcToCall;
        if (4 === (4 & self._type)) {
          funcToCall = $(".modal-body input", context).val();
        }
        self._callback(self._which, funcToCall);
      }
      /** @type {number} */
      self._which = 0;
      delete self._callback;
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _click : function(e) {
      var o = this;
      var self = $(e.target);
      var key = self.data("which");
      o._which = key;
    }
  };
  /**
   * @param {number} arg
   * @return {?}
   */
  $.fn.msgbox = function(arg) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var $el = $(this);
      var instance = $el.data("msgbox");
      var options = "object" == typeof arg ? arg : {};
      if (instance || "string" == typeof arg) {
        if ("string" == typeof arg) {
          instance[arg].apply(instance, Array.prototype.slice.call(args, 1));
        }
      } else {
        $el.data("msgbox", new Modal(this, options));
      }
    });
  };
});

// Ejecucion de plugins de jQuery escalable para todo el codigo
!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("object" == typeof exports) {
      factory(require("jquery"));
    } else {
      if (window.jQuery) {
        factory(window.jQuery);
      }
    }
  }
}(function(format) {
  /**
   * @param {Element} options
   * @param {Object} recurring
   * @return {undefined}
   */
  var Plugin = function(options, recurring) {
    var self = this;
    /** @type {Element} */
    self._el = options;
    /** @type {Object} */
    self._opt = recurring;
  };
  Plugin.prototype = {
    /** @type {function (Element, Object): undefined} */
    constructor : Plugin,
    /**
     * @param {string} key
     * @return {?}
     */
    data : function(key) {
      var elem = this;
      var options = elem._opt;
      return key ? void options.data(key) : options.data();
    }
  };
  /**
   * @param {string} arg
   * @return {?}
   */
  format.fn.ntadapter = function(arg) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var f = format(this);
      var instance = f.data("ntadapter");
      var options = "object" == typeof arg ? arg : {};
      if (instance || "string" == typeof arg) {
        if ("string" == typeof arg) {
          instance[arg].apply(instance, Array.prototype.slice.call(args, 1));
        }
      } else {
        f.data("ntadapter", new Plugin(this, options));
      }
    });
  };
});

// Funciones del tab-menu
!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery", "js-shortid"], factory);
  } else {
    if ("object" == typeof exports) {
      factory(require("jquery"), require("js-shortid"));
    } else {
      if (window.jQuery) {
        factory(window.jQuery, window.shortid || {
          /**
           * @return {?}
           */
          gen : function() {
            /** @type {number} */
            var a = (new Date).getTime();
            for (;a === (new Date).getTime();) {
            }
            return(new Date).getTime();
          }
        });
      }
    }
  }
}(function($, result2) {
  /**
   * @param {Element} fn
   * @param {Object} info
   * @return {undefined}
   */
  var constructor = function(fn, info) {
    var self = this;
    /** @type {Element} */
    self._el = fn;
    /** @type {Object} */
    self._opt = info;
    /** @type {number} */
    self._seq = 1;
    self._msgbox = info.msgbox;
    var link = $(fn).on("click", "a", $.proxy(self._selectTab, self));
    var map = $(".notes-tab-menu", link.parent());
    if (map.length > 0) {
      self._ctxMenu = map[0];
      link.on("contextmenu", "li[data-note-uid]", $.proxy(self._contextmenu, self));
      map.on("click", "a", $.proxy(self._ctxMenuClick, self));
    }
  };
  constructor.prototype = {
    /** @type {function (Element, Object): undefined} */
    constructor : constructor,
    /**
     * @param {Node} item
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    create : function(item, deepDataAndEvents) {
      var self = this;
      var selector = $(self._el);
      /** @type {Node} */
      var items = item;
      if (!$.isArray(item)) {
        /** @type {Array} */
        items = [item];
      }
      /** @type {number} */
      var i = 0;
      for (;i < items.length;i++) {
        if (!items[i].uid) {
          items[i].uid = result2.gen();
        }
        selector.trigger("create.bs.tab", items[i]);
        self._create(items[i], deepDataAndEvents);
      }
    },
    /**
     * @param {Object} opts
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    _create : function(opts, deepDataAndEvents) {
      var self = this;
      var compassResult = self.activeUid();
      var parent = $(self._el);
      var rc1 = $('<li data-note-uid="' + opts.uid + '"><a href="#" data-toggle="tab" title="' + (opts.path || opts.name) + '"><i class="glyphicon glyphicon-file ' + (opts.unsaved ? "text-danger" : "") + '"></i>&nbsp;<span>' + opts.name + '</span><button class="btn btn-default btn-xs" aria-label="Close">&times;</button></a></li>').insertBefore($("li", parent).last());
      parent.trigger("created.bs.tab", [opts]);
      if (deepDataAndEvents) {
        $("a", rc1).tab("show");
      }
      self.lastuid = compassResult;
    },
    /**
     * @param {Object} $item
     * @return {undefined}
     */
    _close : function($item) {
      var self = this;
      var el = $(self._el);
      var x = self.activeUid();
      var y = $item.data("note-uid");
      $item.remove();
      el.trigger("closed.bs.tab", [y]);
      if (x === y) {
        if (self.lastuid && self.lastuid !== x) {
          $("li[data-note-uid=" + self.lastuid + "] a", el).tab("show");
        } else {
          $("li[data-note-uid]:first a", el).tab("show");
        }
      }
      /** @type {null} */
      self.lastuid = null;
    },
    /**
     * @return {undefined}
     */
    closeAll : function() {
      var self = this;
      var el = self._el;
      var elements = $("li[data-note-uid]", el);
      var $window = $(self._msgbox).data("msgbox");
      $window.confirm("Are you sure to close all?", function(dataAndEvents) {
        switch(dataAndEvents) {
          case 1:
            elements.each(function() {
              self._close($(this));
            });
        }
      });
    },
    /**
     * @param {string} full
     * @return {undefined}
     */
    closeOthers : function(full) {
      var self = this;
      var el = self._el;
      /** @type {null} */
      var cursor = null;
      var $window = $(self._msgbox).data("msgbox");
      cursor = full ? $('li[data-note-uid]:not([data-note-uid="' + full + '"])', el) : $("li[data-note-uid]:not(.active)", el);
      $window.confirm("Are you sure to close others?", function(dataAndEvents) {
        switch(dataAndEvents) {
          case 1:
            cursor.each(function() {
              self._close($(this));
            });
        }
      });
    },
    /**
     * @return {?}
     */
    activeUid : function() {
      return $("li.active", this._el).data("note-uid");
    },
    /**
     * @param {Event} e
     * @return {?}
     */
    _selectTab : function(e) {
      var core_indexOf = this;
      var revisionCheckbox = $(e.target);
      var $tabsLinks = $(e.currentTarget);
      var browserEvent = $tabsLinks.parent();
      var qualifier = browserEvent.data("note-uid");
      return revisionCheckbox.is(".btn") ? (e.preventDefault(), void core_indexOf._evalClose(qualifier)) : void(null != qualifier && (void 0 !== qualifier && qualifier !== -1) ? core_indexOf.selectTab(qualifier) : core_indexOf.createUntitled());
    },
    /**
     * @param {string} event
     * @return {undefined}
     */
    selectTab : function(event) {
      var self = this;
      var t = $(self._el);
      var ev = event.uid || event;
      var thirdTab = $("li[data-note-uid=" + ev + "]", t);
      var end = self.activeUid();
      if (ev !== end) {
        thirdTab.tab("show");
        t.trigger("selected.bs.tab", [ev]);
        self.lastuid = end;
      }
    },
    /**
     * @param {Object} user
     * @param {number} opt_async
     * @return {undefined}
     */
    open : function(user, opt_async) {
      var req = this;
      var p = req._el;
      var msg = $("li[data-note-uid=" + user.uid + "]", p);
      if (0 === msg.size()) {
        msg = req.createTag(user);
      }
      if (!(void 0 !== opt_async && (null != opt_async && opt_async !== false))) {
        $("a", msg).tab("show");
      }
    },
    /**
     * @param {string} event
     * @return {undefined}
     */
    _evalClose : function(event) {
      var self = this;
      var trigger = $(self._el);
      trigger.trigger("close.bs.tab", [event]);
      var close = $._data(self._el, "events").close;
      if (!(void 0 !== close && 0 !== close.length)) {
        self.close(event);
      }
    },
    /**
     * @param {string} el
     * @return {undefined}
     */
    close : function(el) {
      var self = this;
      var $container = self._el;
      var item = el ? $("li[data-note-uid=" + (el.uid || el) + "]", $container) : $("li.active", $container);
      self._close(item);
    },
    /**
     * @param {Object} el
     * @return {undefined}
     */
    doRename : function(el) {
      var context = this;
      var root = context._el;
      var item = el ? $("li[data-note-uid=" + el.uid + "]", root) : $("li.active", root);
      $("span", item).text(el.name);
    },
    /**
     * @param {(HTMLElement|boolean)} from
     * @return {undefined}
     */
    rename : function(from) {
      var self = this;
      var i = from || $("li.active", self._el);
      var data = i.data("note-uid");
      var opts = $(self._msgbox).data("msgbox");
      if ("undefined" != typeof chrome && chrome.fileSystem) {
        $(self._el).trigger("rename.bs.tab", [data]);
      } else {
        opts.prompt($("span", i).text(), function(e, target) {
          $(self._el).trigger("rename.bs.tab", [data, target, e]);
        }, "Rename", "File Name");
      }
    },
    /**
     * @return {?}
     */
    createUntitled : function() {
      var self = this;
      var attributes = {
        name : "Untitled" + self._seq
      };
      return self.create(attributes, true), self._seq++, attributes;
    },
    /**
     * @param {?} dataAndEvents
     * @param {string} e
     * @return {undefined}
     */
    markUnsaved : function(dataAndEvents, e) {
      var self = this;
      var el = self._el;
      /** @type {null} */
      var container = null;
      if (e) {
        var consumer = e.uid || e;
        container = $('li[data-note-uid="' + consumer + '"] i', el);
      } else {
        container = $("li.active i", el);
      }
      if (dataAndEvents) {
        if (container.is(".text-danger")) {
          container.removeClass("text-danger");
        }
      } else {
        if (!container.is(".text-danger")) {
          container.addClass("text-danger");
        }
      }
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _contextmenu : function(e) {
      var ev = this;
      var pickWinLeft = e.clientX || (e.offsetX || e.layerX);
      var pickWinTop = e.clientY || (e.offsetY || e.layerY);
      $(ev._ctxMenu).css({
        display : "block",
        left : pickWinLeft,
        top : pickWinTop
      }).show();
      ev._ctxItem = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    _ctxMenuClick : function(event) {
      $(event.delegateTarget).hide();
      var exports = this;
      var $spy = $(event.target);
      var id = $spy.data("nts-cmd");
      var src = $(exports._ctxItem);
      var joined = src.data("note-uid");
      switch(id) {
        case "close":
          exports._evalClose(joined);
          break;
        case "closeOthers":
          exports.closeOthers(joined);
          break;
        case "closeAll":
          exports.closeAll();
          break;
        case "rename":
          exports.rename(src);
      }
    },
    /**
     * @return {undefined}
     */
    hideCtxMenu : function() {
      var ui = this;
      if (ui._ctxMenu) {
        $(ui._ctxMenu).hide();
      }
    },
    /**
     * @return {?}
     */
    count : function() {
      return $("li[data-note-uid]", this._el).size();
    }
  };
  /**
   * @param {string} prop
   * @return {?}
   */
  $.fn.notestab = function(prop) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var data = this;
      var handle = $(data);
      var descriptor = handle.data("notestab");
      var attributes = "object" == typeof prop ? prop : {};
      if (descriptor || "string" == typeof prop) {
        if ("string" == typeof prop) {
          descriptor[prop].apply(descriptor, Array.prototype.slice.call(args, 1));
        }
      } else {
        handle.data("notestab", new constructor(data, $.extend(attributes, handle.data())));
      }
    });
  };
  $(document).on("click", function() {
    $(".notes-tab").notestab("hideCtxMenu");
  });
});

// Funciones de cada boton de la barra de opciones
!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("object" == typeof exports) {
      factory(require("jquery"));
    } else {
      if (window.jQuery) {
        factory(window.jQuery);
      }
    }
  }
}(function($) {
  /**
   * @param {string} input
   * @param {string} type
   * @param {number} len
   * @return {?}
   */
  function parse(input, type, len) {
    type = type || "";
    len = len || 512;
    var buf = atob(input);
    /** @type {Array} */
    var assigns = [];
    /** @type {number} */
    var offset = 0;
    for (;offset < buf.length;offset += len) {
      var s = buf.slice(offset, offset + len);
      /** @type {Array} */
      var dataBuffer = new Array(s.length);
      /** @type {number} */
      var i = 0;
      for (;i < s.length;i++) {
        dataBuffer[i] = s.charCodeAt(i);
      }
      /** @type {Uint8Array} */
      var vvar = new Uint8Array(dataBuffer);
      assigns.push(vvar);
    }
    /** @type {Blob} */
    var res = new Blob(assigns, {
      type : type
    });
    return res;
  }
  /**
   * @return {undefined}
   */
  var Map = function() {
  };
  Map.prototype = {
    /**
     * @param {number} name
     * @param {Function} fn
     * @return {undefined}
     */
    get : function(name, fn) {
      if ("undefined" != typeof chrome && chrome.storage) {
        chrome.storage.local.get(name, function(context) {
          if ("function" == typeof fn) {
            fn(context[name]);
          }
        });
      } else {
        /** @type {null} */
        var view = null;
        if (window.localStorage) {
          /** @type {(null|string)} */
          view = window.localStorage.getItem(name);
        }
        if ("function" == typeof fn) {
          fn(view);
        }
      }
    },
    /**
     * @param {string} key
     * @param {string} value
     * @param {?} fn
     * @return {undefined}
     */
    set : function(key, value, fn) {
      if ("undefined" != typeof chrome && chrome.storage) {
        var dest = {};
        /** @type {string} */
        dest[key] = value;
        chrome.storage.local.set(dest);
      } else {
        if (window.localStorage) {
          window.localStorage.setItem(key, value);
        }
        if ("function" == typeof fn) {
          fn();
        }
      }
    }
  };
  var map = new Map;
  /**
   * @param {string} options
   * @return {undefined}
   */
  var Query = function(options) {
    /** @type {string} */
    this._opt = options;
    this._d = {};
  };
  Query.prototype = {
    /** @type {function (string): undefined} */
    constructor : Query,
    /**
     * @param {string} key
     * @param {string} value
     * @return {undefined}
     */
    setItem : function(key, value) {
      var inst = this;
      if (value) {
        /** @type {string} */
        inst._d[key] = value;
      } else {
        delete inst._d[key];
      }
    },
    /**
     * @param {?} i
     * @return {?}
     */
    getItem : function(i) {
      return this._d[i];
    },
    /**
     * @param {?} val
     * @return {undefined}
     */
    save : function(val) {
      var self = this;
      var o = self._opt;
			var index;
      for (index in self._d) {
				var prop = self._d[index];
        if (!("object" != typeof prop)) {
          if (!prop.d) {
            delete self._d[index];
          }
        }
			}
      map.set(o.id, JSON.stringify(self._d), val);
    },
    /**
     * @param {Function} fn
     * @return {undefined}
     */
    load : function(fn) {
      var self = this;
      var o = self._opt;
      map.get(o.id, function(json) {
        if (json) {
          if ("string" == typeof json) {
            self._d = $.parseJSON(json);
          }
        }
        if ("function" == typeof fn) {
          fn(self._d);
        }
      });
    },
    /**
     * @param {string} callback
     * @return {?}
     */
    find : function(callback) {
      var config = this;
      var map = config._d;
      var key;
      for (key in map) {
        if (callback(map[key], key)) {
          return map[key];
        }
      }
    }
  };
  /**
   * @param {Element} template
   * @param {Object} conf
   * @return {undefined}
   */
  var create = function(template, conf) {
    var self = this;
    /** @type {Element} */
    self._el = template;
    /** @type {Object} */
    self._opt = conf;
    self._msgbox = conf.msgbox;
    self._adapter = conf.adapter;
    self._autoSaveInterval = conf.autoSaveInterval || 6E5;
    /** @type {number} */
    self._initTime = (new Date).getTime();
    self._store = new Query({
      id : conf.id || "__notes"
    });
    var clone = $(".notes-tab", template).notestab({
      msgbox : conf.msgbox
    }).on("closed.bs.tab", $.proxy(self._tabClosed, self)).on("close.bs.tab", $.proxy(self._tabClose, self)).on("selected.bs.tab", $.proxy(self._tabSelected, self)).on("created.bs.tab", $.proxy(self._tabCreated, self)).on("shown.bs.tab", $.proxy(self._tabShown, self)).on("rename.bs.tab", $.proxy(self._tabRename, self));
    self._notestab = clone[0];
    self._store.load(function(set) {
      /** @type {Array} */
      var options = [];
      var i;
      for (i in set) {
        if ("__ctxUid" === i) {
          self._ctxUid = set[i];
        } else {
          options[options.length] = set[i];
        }
      }
      if (options.length > 0) {
        clone.notestab("create", options);
        if (self._ctxUid) {
          $("a", $("li[data-note-uid=" + self._ctxUid + "]", clone)).tab("show");
        } else {
          $("a", $("li:first", clone)).tab("show");
        }
      } else {
        clone.notestab("createUntitled");
      }
    });
    $(self._adapter).on("edit.ntadapter", $.proxy(self._edit, self));
    $(template).on("click", "a[data-nts-cmd], button[data-nts-cmd]", $.proxy(self._cmd, self));
    Mousetrap.bind(["command+t", "ctrl+t"], $.proxy(self.createTab, self));
    Mousetrap.bind(["command+o", "ctrl+o"], $.proxy(self.open, self));
    Mousetrap.bind(["command+s", "ctrl+s"], $.proxy(self.saveLocal, self));
    Mousetrap.bind(["command+w", "ctrl+w"], $.proxy(self.close, self));
    setInterval(function() {
      self.save2LocalStore();
    }, self._autoSaveInterval);
  };
  create.prototype = {
    /** @type {function (Element, Object): undefined} */
    constructor : create,
    /**
     * @param {?} dataAndEvents
     * @param {(Document|string)} deleted
     * @return {undefined}
     */
    _edit : function(dataAndEvents, deleted) {
      var self = this;
      var component = self.note(self._ctxUid);
      if (component) {
        if (component.d !== deleted) {
          /** @type {boolean} */
          component.unsaved = true;
          component.d = deleted || $(self._adapter).data("ntadapter").data();
          $(self._notestab).notestab("markUnsaved", false, component);
        }
      }
    },
    /**
     * @param {?} dataAndEvents
     * @param {string} event
     * @return {undefined}
     */
    _tabClose : function(dataAndEvents, event) {
      var srv = this;
      srv.close(event);
    },
    /**
     * @param {?} event
     * @param {string} key
     * @return {undefined}
     */
    _tabClosed : function(event, key) {
      var self = this;
      var data = self._store;
      var collection = $(self._notestab).data("notestab");
      var camelKey = self.note(key);
      if (camelKey) {
        delete camelKey.d;
      }
      if (0 === collection.count()) {
        $(self._adapter).ntadapter("data", camelKey);
        collection.createUntitled();
      }
      data.setItem(key);
    },
    /**
     * @param {?} event
     * @param {string} key
     * @return {undefined}
     */
    _tabSelected : function(event, key) {
      var self = this;
      var camelKey = self.note(key);
      /** @type {string} */
      self._ctxUid = key;
      $(self._adapter).ntadapter("data", camelKey);
    },
    /**
     * @param {?} dataAndEvents
     * @param {Object} comment
     * @return {undefined}
     */
    _tabCreated : function(dataAndEvents, comment) {
      var self = this;
      var that = $(self._notestab).data("notestab");
      if (that.count() > 1) {
        var args = self.note(self._ctxUid);
        if (!!args) {
          if (!args.unsaved) {
            if (!args.d) {
              if (!(0 !== args.name.indexOf("Untitled"))) {
                that.close(args.uid);
              }
            }
          }
        }
      }
      self.note(comment.uid, comment);
      $(self._adapter).ntadapter("data", comment);
    },
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    _tabShown : function(ev) {
      var self = this;
      var newName = $(ev.target).parent().data("note-uid");
      self._ctxUid = newName;
      $(self._adapter).ntadapter("data", self.note(newName));
    },
    /**
     * @param {?} dataAndEvents
     * @param {string} arg
     * @param {string} name
     * @return {undefined}
     */
    _tabRename : function(dataAndEvents, arg, name) {
      var self = this;
      var msg = self.note(arg);
      if (name) {
        /** @type {string} */
        msg.name = name;
        $(self._notestab).notestab("doRename", msg);
      } else {
        if ("undefined" != typeof chrome) {
          if (chrome.storage) {
            if (msg.savedId) {
              chrome.fileSystem.restoreEntry(msg.savedId, function(selfObj) {
                self._chromeSaveAs(msg.name, msg.d, self._chromeSaved(msg, function() {
                  selfObj.remove(function() {
                    console.log("removed");
                  });
                }));
              });
            }
          }
        }
      }
    },
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    _cmd : function(ev) {
      var self = this;
      var quoted = $(ev.currentTarget).data();
      var str = quoted.ntsCmd;
      var $spy = $(self._notestab);
      var server = $spy.data("notestab");
      var args = self.activeFile();
      switch(str) {
        case "save":
          self.saveLocal();
          break;
        case "saveas":
          self.saveLocal({
            uid : args.uid,
            name : args.name,
            d : args.d
          }, function(comment) {
            self.note(comment.uid, comment);
          });
          break;
        case "new":
          $(self._notestab).notestab("createUntitled");
          break;
        case "open":
          self.open();
          break;
        case "close":
          self.close();
          break;
        case "closeOthers":
          server.closeOthers(args.uid);
          break;
        case "closeAll":
          server.closeAll();
          break;
        case "rename":
          server.rename();
          break;
        case "shutdown":
          self.save2LocalStore();
          if ("undefined" != typeof chrome) {
            if (chrome.app) {
              chrome.app.window.current().close();
            }
          }
          break;
        case "maximize":
          if ("undefined" != typeof chrome) {
            if (chrome.app) {
              if (chrome.app.window.current().isMaximized()) {
                chrome.app.window.current().restore();
              } else {
                chrome.app.window.current().maximize();
              }
            }
          }
          break;
        case "minimize":
          if ("undefined" != typeof chrome) {
            if (chrome.app) {
              chrome.app.window.current().minimize();
            }
          }
          break;
        default:
          $(self._el).trigger("cmd.nts", [ev.currentTarget]);
      }
    },
    /**
     * @param {string} name
     * @param {Object} value
     * @return {?}
     */
    note : function(name, value) {
      var me = this;
      var data = me._store;
      return value ? void data.setItem(name, value) : data.getItem(name);
    },
    /**
     * @return {?}
     */
    createTab : function() {
      var ui = this;
      var emptyJ = $(ui._notestab);
      return emptyJ.notestab("createUntitled"), false;
    },
    /**
     * @return {?}
     */
    open : function() {
			// console.log('wtf')
      var ui = this;
      return ui.openLocal(function(deepDataAndEvents) { // function(deepDataAndEvents) = onLoad
        $(ui._notestab).notestab("create", deepDataAndEvents, true);
      }), false;
    },
    /**
     * @param {Function} callback
     * @param {Function} elem
     * @return {?}
     */
    _chromeReadFile : function(callback, elem) { // elem es el archivo
			var self = this;
			//Indicamos el store
      var data = self._store;
      return function(fd) {
				//obtenemos el path en el cual se encuentra el archivo
        chrome.fileSystem.getDisplayPath(elem, function(path) {
					//buscamos en la data(store) el archivo que coincida con el path
          var r20 = data.find(function(opts) {
            return console.log(opts.path), path === opts.path;
          });
          if (r20) {
						//si el archivo existe entonces lo colocamos y mostramos como el archivo actual a observar
            $(self._notestab).notestab("selectTab", r20);
          } else {
						var hasBody = chrome.fileSystem.retainEntry(elem);
						console.log(hasBody)
						//si no se encuentra en la data entonces lo leemos de 0 utilizando el FileReader(api de javascript)
            self._readFile(fd, function(ev) {
              callback({
                name : elem.name,
                d : ev.target.result,
                path : path,
                savedId : hasBody
              });
            });
          }
        });
      };
    },
    /**
     * @param {Function} onLoad
     * @return {undefined}
     */
		// INIT OPENLOCAL
    openLocal : function(onLoad) {
			var self = this;

			//Se guarda el formato en la variable
			var nType = self._opt.mime;

			//Cuadro de mensaje para informar
			var utils = $(self._msgbox).data("msgbox");

			//Si el objeto chrome existe y posee fileSystem entonces..
      if ("undefined" != typeof chrome && chrome.fileSystem) {
				//indicamos que vamos  aabrir un archivo o multiples
        chrome.fileSystem.chooseEntry({
          type : "openFile",
          acceptsMultiple : true
        }, function(items) {
			//nos devuelve los items que selecciones.. y si no hay ningun error y hay items entonces..
          if (!chrome.runtime.lastError && items) {
            /**
             * @param {?} msg
             * @return {undefined}
             */
            var onError = function(msg) {
              utils.alert(msg);
            };
            /** @type {number} */
						var i = 0;
						/*Vamos a leer cada uno de los items ejecutando la funcion de chromereadfile usada anteriormente
						recibe como parametro la funcion a ejecutar al momento de abrir, el item y la funcion a ejecutar en caso de un error
						que en este caso lo que hace es alertar del error
						*/
            for (;i < items.length;i++) {
              items[i].file(self._chromeReadFile(onLoad, items[i]), onError);
            }
          }
        });
			} else { //Si no existe el objeto chrome o no posee la propiedad
				//seleccionas elementos con el id de open file 
				var $fixture = $("#_openFile"); //jquery
				//en caso de que noe xista ninguno entonces lo creamos
        if (0 === $fixture.length) {
          $fixture = $('<input type="file" name="file" multiple />');
				}
				//agregamos el evento change para saber cuando se seleccionaron archivos a abrir, cargando la funcion loadLocal
        $fixture.on("change", $.proxy(self._loadLocal, self)).on("load", function(ev, str, path, scripts) {
					/* si vemos que el parametro str que nos devuelve al cargar el archivo es un string entonces sabremos que es un json pasado a string
					por lo tanto lo devolvemos a un JSON parseandolo */
					if ("string" == typeof str) { // texto plano
            if (/json/i.test(nType)) { //expresion regular 
              str = $.parseJSON(str); //parsear, transformar a un objeto
            }
					}
					//Procedemos a cargar el archivo. El path vendria siendo como el indice
          onLoad({
            name : scripts[path].name,
            d : str
					});
					//si no hay mas archivos entonces removemos el input que creamos
          if (path === scripts.length - 1) {
            $(ev.target).remove();
					}
				//el click es para abrir el input y nos indique que seleccionemos los archivos a abrir
        }).click();
      }
    },
    /**
     * @param {string} data
     * @return {undefined}
     */
    openRemote : function(data) {
      var self = this;
      var url = data.url || (data || prompt("Remote URL:", "http://"));
      if (url) {
        /** @type {Element} */
        var hash = document.createElement("a");
        hash.href = url;
        var errorName = hash.pathname.split("/").pop();
        var attributes = {
          name : errorName,
          d : "> Loading...",
          readOnly : true
        };
        if ("string" != typeof data) {
          attributes = $.extend(attributes, data);
        }
        $(self._notestab).notestab("create", attributes, true);
        $.ajax({
          url : url,
          /**
           * @param {string} data
           * @return {undefined}
           */
          success : function(data) {
            /** @type {string} */
            attributes.d = data;
            $(self._adapter).ntadapter("data", attributes);
          },
          /**
           * @param {?} textStatus
           * @param {string} a
           * @param {Function} b
           * @return {undefined}
           */
          error : function(textStatus, a, b) {
            /** @type {string} */
            attributes.d = "> Load failure!!!\n" + (a || b);
            $(self._adapter).ntadapter("data", attributes);
          }
        });
      }
    },
    /**
     * @param {string} event
     * @return {?}
     */
    close : function(event) {
      var self = this;
      var srv = $(self._notestab).data("notestab");
      var account = self.note(event || srv.activeUid());
      var $window = $(self._msgbox).data("msgbox");
      return account && !account.unsaved ? srv.close(event) : $window.confirm('Save file "' + account.name + '"?', function(dataAndEvents) {
        switch(dataAndEvents) {
          case 1:
            self.saveLocal(account);
            srv.close(event);
            break;
          case -1:
            srv.close(event);
        }
      }, "Save"), false;
    },
    /**
     * @param {Object} name
     * @param {Function} callback
     * @return {?}
     */
		// INIT SAVELOCAL
    saveLocal : function(name, callback) {
			var self = this;

			//Se declara la variable options obteniendola de this
			var options = self._opt;
			/*Con esto se coloca la extension, si en las opciones hay un suffix entonces la extension 
			sera por ejemplo .sfd, si no hay un suffix entonces la extensions era .txt */
			var f = "." + (options.suffix || "txt");

			//se obtienen los datos
			var notestab = $(self._notestab).data("notestab");
		  console.log(notestab.activeUid)
			/* si existe el parametro name entonces se asigna como el archivo, si no ejecutaremos 
			la funcion de note pasando como parametro el UID, la funcion note simplemente obtendra la data
			de un store atraves del uid que le pasamos */
			var file = name || self.note(notestab.activeUid());
			console.log(file)
      if (self.save2LocalStore(), file) {

				//Se asigna el source del archivo
				var src = file.d || "";

				//se asigna el nombre del archivo
				var filename = file.name;
        if (
					filename //que el nombre del archivo exista
					&& 
					(filename += filename.lastIndexOf(".") === -1 ? f : ""), //se agrega la extensio al nombre del archivo
					"function" == typeof options.saveData //que la funcion para maejar el source efectivamente sea una funcion
					&& 
					(src = options.saveData(src)), //se pasa el source a una data manejable
					"object" == typeof src //que el src sea un objeto
					&& 
					(src = JSON.stringify(src)), //se pasa el source a un string
					"undefined" != typeof chrome // si el objeto chrome esta definidio / existe
					&& 
					chrome.fileSystem //si chrome posee el fileSystem
				) {
					//si el archivo posee un id de guardado previo entonces...
          if (file.savedId) {
					//verificamos si tenemos permisos para resturar la entrada con el id que le pasamos
            chrome.fileSystem.isRestorable(file.savedId, function(dataAndEvents) { // fx anonima
					//si el callback nos devuelve data entonces..
              if (dataAndEvents) {
				    //restauramos la entrada pasandole el id de guardado previo, esto nos devuelve la entrada
                chrome.fileSystem.restoreEntry(file.savedId, function(slide) {
					//si tenemos la entrada/archivo entonces...
                  if (slide) {
										//guardamos el archivo
                    self._chromeWriteFile(slide, src, function() {
											//colocamos que ha sido guardado
                      file.unsaved = false;
                      $(self._notestab).notestab("markUnsaved", true);
                    });
                  }
                });
              } else {
								//solicita al usuario donde guardar el archivo.. recomienda un nombre ne este caso el filename
                self._chromeSaveAs(filename, src, self._chromeSaved(file, callback));
              }
            });
          } else {
						//solicita al usuario donde guardar el archivo.. recomienda un nombre ne este caso el filename
            self._chromeSaveAs(filename, src, self._chromeSaved(file, callback));
          }
        } else {
					//si el objeto window posee la funcio saveAs entonces la usamos
          if (window.saveAs) {
            window.saveAs(new Blob([src], {
              type : options.mime || "text/plain"
            }), filename);
          } else {
						//Si el window.saveAs no existe pero el navigator.mssaveblob si entonces lo usamos para eguardar
            if (navigator.msSaveBlob) {
              navigator.msSaveBlob(new Blob([src], {
                type : options.mime || "text/plain"
              }), filename);
            } else {
              //si ninguna condicion se cumple entonces usamos nuestra funcion saveAs
              var result = "data:" + (options.mime || "text/plain") + ";charset=utf-8," + encodeURIComponent(src);
              self.saveAs(result, filename);
            }
          }
          $(self._notestab).notestab("markUnsaved", true);
        }
      }
      return false;
    },
    /**
     * @param {string} type
     * @param {?} filename
     * @param {string} utcMode
     * @return {undefined}
     */
		// INIT SAVEAS
    saveAs : function(type, filename, utcMode) {
      //Verificamos que si al crear un elemento "a" generalmente usado para links este nos permitira ser descargado
			var can_use_save_link = "download" in document.createElement("a");

			//Si se cumple la condicion y puede ser descargado
      if (can_use_save_link) {
        //Creamos el elemento "a"
				var link = document.createElement("a");
				/*si al agregarle el atributo href el tipo, el archivo descargado y crear el evento no hay ningun error
				entonces procedemos */
        if (link.setAttribute("href", type), link.setAttribute("download", filename), document.createEvent) {
					//En la variable click vamos a crear el eventeo de mouseevents
					var click = document.createEvent("MouseEvents");
					//En indicaremos que se ejecute cuando se haga click
					click.initEvent("click", true, true);
					/*hacemos que el elemento a que acabamos de crear sea clickeado 
					atraves de codigo haciendo el dispatchEvent diciendo que lo que ocurrira sera un click*/
          link.dispatchEvent(click);
        } else {
					//Si no se cumple la condicion anterior simplemente hacemos click en el link
          link.click();
        }
      } else {
				/* Si al crear un elemento "a" no poddremos hacer el download entonces verificamos si el navigator
				posee la propiedad saveblob */
        if (navigator.msSaveBlob) {
					//buscando si en el tipo se indica que es base64
					var nsIndex = type.indexOf(";base64,");
					//si el indice es diferente a -1 quiere decir quiere decir que si es un base 64
          if (nsIndex !== -1) {
						type = type.substring(nsIndex + 8);
					}
					//parseamos el tipo y luego descargamos
          type = parse(type, utcMode || "image/*");
          navigator.msSaveBlob(type, filename);
        } else {
          console.log(window.navigator.msSaveBlob);
          console.log("Not support download attribute");
        }
      }
    },
    /**
     * @param {Object} file
     * @param {Function} callback
     * @return {?}
     */
    _chromeSaved : function(file, callback) {
      var ui = this;
      return function(entry) {
        file.savedId = chrome.fileSystem.retainEntry(entry);
        file.path = entry.fullPath;
        file.name = entry.name;
        /** @type {boolean} */
        file.unsaved = false;
        $(ui._notestab).notestab("markUnsaved", true).notestab("doRename", file);
        if ("function" == typeof callback) {
          callback(file, entry);
        }
      };
    },
    /**
     * @param {?} evt
     * @param {?} xs
     * @param {Function} cb
     * @return {undefined}
     */
    _chromeWriteFile : function(evt, xs, cb) {
      var elem = this;
      var options = elem._opt;
      evt.createWriter(function(fileWriter) {
        /** @type {boolean} */
        var f = false;
        /**
         * @return {?}
         */
        fileWriter.onwriteend = function() {
          return f ? void("function" == typeof cb && cb(evt)) : (f = true, void this.truncate(this.position));
        };
        fileWriter.write(new Blob([xs], {
          type : options.mime || "text/plain"
        }));
      }, function(fmt) {
        console.log(fmt);
      });
    },
    /**
     * @param {?} filename
     * @param {?} xs
     * @param {Function} cb
     * @return {undefined}
     */
    _chromeSaveAs : function(filename, xs, cb) {
      var _ = this;
      chrome.fileSystem.chooseEntry({
        type : "saveFile",
        suggestedName : filename
      }, function(scope) {
        if (!chrome.runtime.lastError) {
          if (scope) {
            _._chromeWriteFile(scope, xs, cb);
          }
        }
      });
    },
    /**
     * @param {?} status
     * @param {?} e
     * @param {Object} self
     * @return {?}
     */
    _noteLoad : function(status, e, self) {
      return function(ev) {
        var data = ev.target.result;
        self.trigger("load", [data, status, e]);
      };
    },
    /**
     * @param {Event} options
     * @return {undefined}
     */
    _loadLocal : function(options) {
      var self = this;
      var $file = $(options.target);
      var fileList = $file[0].files;
      /** @type {number} */
      var i = 0;
      for (;i < fileList.length;i++) {
        var js = fileList.item(i);
        self._readFile(js, $.proxy(self._noteLoad, self)(i, fileList, $file));
      }
    },
    /**
     * @param {?} file
     * @param {Function} callback
     * @return {undefined}
     */
    _readFile : function(file, callback) {
      /** @type {FileReader} */
      var reader = new FileReader; // API JS
      var item = this;
      var nType = item._opt.mime;
      /** @type {Function} */
      reader.onload = callback;
      if (/\.(txt|md|js|xml|html|json)$/i.test(file.name) || /text/i.test(nType)) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    },
    /**
     * @return {undefined}
     */
    save2LocalStore : function() {
      var self = this;
      if (self._ctxUid) {
        var from = self.note(self._ctxUid);
        if (from) {
          if (from.d) {
            self._store.setItem("__ctxUid", self._ctxUid); // (nombre, guardando)
          }
        }
      }
      self._store.save();
    },
    /**
     * @return {?}
     */
    _localStorage : function() {
      return map;
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    hotkey : function(event) {
      var dialog = this;
      var emptyJ = $(dialog._notestab);
      /** @type {boolean} */
      var e = false;
      if (event.ctrlKey) {
        switch(event.which) {
          case 84:
            emptyJ.notestab("createUntitled");
            /** @type {boolean} */
            e = true;
            break;
          case 79:
            dialog.open();
            /** @type {boolean} */
            e = true;
            break;
          case 83:
            dialog.saveLocal();
            /** @type {boolean} */
            e = true;
            break;
          case 87:
            dialog.close();
            /** @type {boolean} */
            e = true;
            break;
          case 116:
          ;
        }
      }
      if (e) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    /**
     * @return {?}
     */
    activeFile : function() {
      var data = this;
      var notestab = $(data._notestab).data("notestab");
      return data.note(notestab.activeUid());
    }
  };
  /**
   * @param {string} arg
   * @return {?}
   */
  $.fn.notes = function(arg) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var section = $(this);
      var items = section.data("notes");
      var data = "object" == typeof arg ? arg : {};
      if (items || "string" == typeof arg) {
        if ("string" == typeof arg) {
          items[arg].apply(items, Array.prototype.slice.call(args, 1));
        }
      } else {
        section.data("notes", new create(this, data));
      }
    });
  };
});

// ??
(function(exports, doc, i) {
  /**
   * @param {Object} el
   * @param {string} type
   * @param {Function} callback
   * @return {undefined}
   */
  function _addEvent(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, false);
    } else {
      el.attachEvent("on" + type, callback);
    }
  }
  /**
   * @param {Event} e
   * @return {?}
   */
  function _characterFromEvent(e) {
    if ("keypress" == e.type) {
      /** @type {string} */
      var character = String.fromCharCode(e.which);
      if (!e.shiftKey) {
        /** @type {string} */
        character = character.toLowerCase();
      }
      return character;
    }
    return _MAP[e.which] ? _MAP[e.which] : keys[e.which] ? keys[e.which] : String.fromCharCode(e.which).toLowerCase();
  }
  /**
   * @param {Event} e
   * @return {?}
   */
  function _eventModifiers(e) {
    /** @type {Array} */
    var modifiers = [];
    if (e.shiftKey) {
      modifiers.push("shift");
    }
    if (e.altKey) {
      modifiers.push("alt");
    }
    if (e.ctrlKey) {
      modifiers.push("ctrl");
    }
    if (e.metaKey) {
      modifiers.push("meta");
    }
    return modifiers;
  }
  /**
   * @param {string} key
   * @return {?}
   */
  function func(key) {
    return "shift" == key || ("ctrl" == key || ("alt" == key || "meta" == key));
  }
  /**
   * @param {(Object|string)} ev
   * @param {string} info
   * @return {?}
   */
  function process(ev, info) {
    var events;
    var fn;
    var action;
    /** @type {Array} */
    var modifiers = [];
    /** @type {(Object|string)} */
    events = ev;
    if ("+" === events) {
      /** @type {Array} */
      events = ["+"];
    } else {
      events = events.replace(/\+{2}/g, "+plus");
      events = events.split("+");
    }
    /** @type {number} */
    action = 0;
    for (;action < events.length;++action) {
      fn = events[action];
      if (_SPECIAL_ALIASES[fn]) {
        fn = _SPECIAL_ALIASES[fn];
      }
      if (info) {
        if ("keypress" != info) {
          if (fns[fn]) {
            fn = fns[fn];
            modifiers.push("shift");
          }
        }
      }
      if (func(fn)) {
        modifiers.push(fn);
      }
    }
    events = fn;
    /** @type {string} */
    action = info;
    if (!action) {
      if (!res) {
        res = {};
        var key;
        for (key in _MAP) {
          if (!(95 < key && 112 > key)) {
            if (_MAP.hasOwnProperty(key)) {
              /** @type {string} */
              res[_MAP[key]] = key;
            }
          }
        }
      }
      /** @type {string} */
      action = res[events] ? "keydown" : "keypress";
    }
    if ("keypress" == action) {
      if (modifiers.length) {
        /** @type {string} */
        action = "keydown";
      }
    }
    return{
      key : fn,
      modifiers : modifiers,
      action : action
    };
  }
  /**
   * @param {Object} target
   * @param {Object} shallow
   * @return {?}
   */
  function flatten(target, shallow) {
    return null === target || target === doc ? false : target === shallow ? true : flatten(target.parentNode, shallow);
  }
  /**
   * @param {Object} context
   * @return {?}
   */
  function init(context) {
    /**
     * @param {Object} errors
     * @return {undefined}
     */
    function done(errors) {
      errors = errors || {};
      /** @type {boolean} */
      var b = false;
      var key;
      for (key in _sequenceLevels) {
        if (errors[key]) {
          /** @type {boolean} */
          b = true;
        } else {
          /** @type {number} */
          _sequenceLevels[key] = 0;
        }
      }
      if (!b) {
        /** @type {boolean} */
        type = false;
      }
    }
    /**
     * @param {string} name
     * @param {Array} modifiers
     * @param {Event} e
     * @param {boolean} sequenceName
     * @param {string} combination
     * @param {number} level
     * @return {?}
     */
    function _getMatches(name, modifiers, e, sequenceName, combination, level) {
      var i;
      var callback;
      /** @type {Array} */
      var domWaiters = [];
      var action = e.type;
      if (!self._callbacks[name]) {
        return[];
      }
      if ("keyup" == action) {
        if (func(name)) {
          /** @type {Array} */
          modifiers = [name];
        }
      }
      /** @type {number} */
      i = 0;
      for (;i < self._callbacks[name].length;++i) {
        if (callback = self._callbacks[name][i], (sequenceName || (!callback.seq || _sequenceLevels[callback.seq] == callback.level)) && action == callback.action) {
          var keys;
          if (!(keys = "keypress" == action && (!e.metaKey && !e.ctrlKey))) {
            keys = callback.modifiers;
            /** @type {boolean} */
            keys = modifiers.sort().join(",") === keys.sort().join(",");
          }
          if (keys) {
            keys = sequenceName && (callback.seq == sequenceName && callback.level == level);
            if (!sequenceName && callback.combo == combination || keys) {
              self._callbacks[name].splice(i, 1);
            }
            domWaiters.push(callback);
          }
        }
      }
      return domWaiters;
    }
    /**
     * @param {Function} callback
     * @param {Event} e
     * @param {string} combo
     * @param {?} sequence
     * @return {undefined}
     */
    function _fireCallback(callback, e, combo, sequence) {
      if (!self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
        if (!(false !== callback(e, combo))) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            /** @type {boolean} */
            e.returnValue = false;
          }
          if (e.stopPropagation) {
            e.stopPropagation();
          } else {
            /** @type {boolean} */
            e.cancelBubble = true;
          }
        }
      }
    }
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function _handleKeyEvent(e) {
      if ("number" !== typeof e.which) {
        e.which = e.keyCode;
      }
      var character = _characterFromEvent(e);
      if (character) {
        if ("keyup" == e.type && _ignoreNextKeyup === character) {
          /** @type {boolean} */
          _ignoreNextKeyup = false;
        } else {
          self.handleKey(character, _eventModifiers(e), e);
        }
      }
    }
    /**
     * @param {string} combo
     * @param {(Array|Uint8Array)} keys
     * @param {Function} callback
     * @param {string} action
     * @return {undefined}
     */
    function _bindSequence(combo, keys, callback, action) {
      /**
       * @param {boolean} fx
       * @return {?}
       */
      function _increaseSequence(fx) {
        return function() {
          /** @type {boolean} */
          type = fx;
          ++_sequenceLevels[combo];
          clearTimeout(timer);
          /** @type {number} */
          timer = setTimeout(done, 1E3);
        };
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function _callbackAndReset(e) {
        _fireCallback(callback, e, combo);
        if ("keyup" !== action) {
          _ignoreNextKeyup = _characterFromEvent(e);
        }
        setTimeout(done, 10);
      }
      /** @type {number} */
      var i = _sequenceLevels[combo] = 0;
      for (;i < keys.length;++i) {
        var wrappedCallback = i + 1 === keys.length ? _callbackAndReset : _increaseSequence(action || process(keys[i + 1]).action);
        _bindSingle(keys[i], wrappedCallback, action, combo, i);
      }
    }
    /**
     * @param {string} combination
     * @param {Function} callback
     * @param {Object} info
     * @param {string} sequenceName
     * @param {number} level
     * @return {undefined}
     */
    function _bindSingle(combination, callback, info, sequenceName, level) {
      /** @type {Function} */
      self._directMap[combination + ":" + info] = callback;
      combination = combination.replace(/\s+/g, " ");
      var sequence = combination.split(" ");
      if (1 < sequence.length) {
        _bindSequence(combination, sequence, callback, info);
      } else {
        info = process(combination, info);
        self._callbacks[info.key] = self._callbacks[info.key] || [];
        _getMatches(info.key, info.modifiers, {
          type : info.action
        }, sequenceName, combination, level);
        self._callbacks[info.key][sequenceName ? "unshift" : "push"]({
          /** @type {Function} */
          callback : callback,
          modifiers : info.modifiers,
          action : info.action,
          seq : sequenceName,
          level : level,
          combo : combination
        });
      }
    }
    var self = this;
    context = context || doc;
    if (!(self instanceof init)) {
      return new init(context);
    }
    /** @type {Object} */
    self.target = context;
    self._callbacks = {};
    self._directMap = {};
    var _sequenceLevels = {};
    var timer;
    /** @type {boolean} */
    var _ignoreNextKeyup = false;
    /** @type {boolean} */
    var handle = false;
    /** @type {boolean} */
    var type = false;
    /**
     * @param {string} key
     * @param {Object} modifiers
     * @param {Event} e
     * @return {undefined}
     */
    self._handleKey = function(key, modifiers, e) {
      var callbacks = _getMatches(key, modifiers, e);
      var i;
      modifiers = {};
      /** @type {number} */
      var closingAnimationTime = 0;
      /** @type {boolean} */
      var ontype = false;
      /** @type {number} */
      i = 0;
      for (;i < callbacks.length;++i) {
        if (callbacks[i].seq) {
          /** @type {number} */
          closingAnimationTime = Math.max(closingAnimationTime, callbacks[i].level);
        }
      }
      /** @type {number} */
      i = 0;
      for (;i < callbacks.length;++i) {
        if (callbacks[i].seq) {
          if (callbacks[i].level == closingAnimationTime) {
            /** @type {boolean} */
            ontype = true;
            /** @type {number} */
            modifiers[callbacks[i].seq] = 1;
            _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
          }
        } else {
          if (!ontype) {
            _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
          }
        }
      }
      callbacks = "keypress" == e.type && handle;
      if (!(e.type != type)) {
        if (!func(key)) {
          if (!callbacks) {
            done(modifiers);
          }
        }
      }
      /** @type {boolean} */
      handle = ontype && "keydown" == e.type;
    };
    /**
     * @param {Array} combinations
     * @param {Function} callback
     * @param {Object} action
     * @return {undefined}
     */
    self._bindMultiple = function(combinations, callback, action) {
      /** @type {number} */
      var i = 0;
      for (;i < combinations.length;++i) {
        _bindSingle(combinations[i], callback, action);
      }
    };
    _addEvent(context, "keypress", _handleKeyEvent);
    _addEvent(context, "keydown", _handleKeyEvent);
    _addEvent(context, "keyup", _handleKeyEvent);
  }
  var _MAP = {
    8 : "backspace",
    9 : "tab",
    13 : "enter",
    16 : "shift",
    17 : "ctrl",
    18 : "alt",
    20 : "capslock",
    27 : "esc",
    32 : "space",
    33 : "pageup",
    34 : "pagedown",
    35 : "end",
    36 : "home",
    37 : "left",
    38 : "up",
    39 : "right",
    40 : "down",
    45 : "ins",
    46 : "del",
    91 : "meta",
    93 : "meta",
    224 : "meta"
  };
  var keys = {
    106 : "*",
    107 : "+",
    109 : "-",
    110 : ".",
    111 : "/",
    186 : ";",
    187 : "=",
    188 : ",",
    189 : "-",
    190 : ".",
    191 : "/",
    192 : "`",
    219 : "[",
    220 : "\\",
    221 : "]",
    222 : "'"
  };
  var fns = {
    "~" : "`",
    "!" : "1",
    "@" : "2",
    "#" : "3",
    $ : "4",
    "%" : "5",
    "^" : "6",
    "&" : "7",
    "*" : "8",
    "(" : "9",
    ")" : "0",
    _ : "-",
    "+" : "=",
    ":" : ";",
    '"' : "'",
    "<" : ",",
    ">" : ".",
    "?" : "/",
    "|" : "\\"
  };
  var _SPECIAL_ALIASES = {
    option : "alt",
    command : "meta",
    "return" : "enter",
    escape : "esc",
    plus : "+",
    mod : /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
  };
  var res;
  /** @type {number} */
  i = 1;
  for (;20 > i;++i) {
    /** @type {string} */
    _MAP[111 + i] = "f" + i;
  }
  /** @type {number} */
  i = 0;
  for (;9 >= i;++i) {
    /** @type {number} */
    _MAP[i + 96] = i;
  }
  /**
   * @param {?} type
   * @param {Function} material
   * @param {?} capture
   * @return {?}
   */
  init.prototype.bind = function(type, material, capture) {
    /** @type {Array} */
    type = type instanceof Array ? type : [type];
    this._bindMultiple.call(this, type, material, capture);
    return this;
  };
  /**
   * @param {?} options
   * @param {?} capture
   * @return {?}
   */
  init.prototype.unbind = function(options, capture) {
    return this.bind.call(this, options, function() {
    }, capture);
  };
  /**
   * @param {string} opt_attributes
   * @param {Array} data
   * @return {?}
   */
  init.prototype.trigger = function(opt_attributes, data) {
    if (this._directMap[opt_attributes + ":" + data]) {
      this._directMap[opt_attributes + ":" + data]({}, opt_attributes);
    }
    return this;
  };
  /**
   * @return {?}
   */
  init.prototype.reset = function() {
    this._callbacks = {};
    this._directMap = {};
    return this;
  };
  /**
   * @param {Event} e
   * @param {Element} element
   * @return {?}
   */
  init.prototype.stopCallback = function(e, element) {
    return-1 < (" " + element.className + " ").indexOf(" mousetrap ") || flatten(element, this.target) ? false : "INPUT" == element.tagName || ("SELECT" == element.tagName || ("TEXTAREA" == element.tagName || element.isContentEditable));
  };
  /**
   * @return {?}
   */
  init.prototype.handleKey = function() {
    return this._handleKey.apply(this, arguments);
  };
  /**
   * @return {undefined}
   */
  init.init = function() {
    var nodes = init(doc);
    var i;
    for (i in nodes) {
      if ("_" !== i.charAt(0)) {
        init[i] = function(from) {
          return function() {
            return nodes[from].apply(nodes, arguments);
          };
        }(i);
      }
    }
  };
  init.init();
  /** @type {function (Object): ?} */
  exports.Mousetrap = init;
  if ("undefined" !== typeof module) {
    if (module.exports) {
      /** @type {function (Object): ?} */
      module.exports = init;
    }
  }
  if ("function" === typeof define) {
    if (define.amd) {
      define(function() {
        return init;
      });
    }
  }
})(window, document);

// ??
!function(first, definition) {
  if ("function" == typeof define && define.amd) {
    define(definition);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = definition();
    } else {
      var i = first.shortid;
      var jQuery = definition();
      /**
       * @return {?}
       */
      jQuery.noConflict = function() {
        return first.shortid = i, jQuery;
      };
      first.shortid = jQuery;
    }
  }
}(this, function() {
  /** @type {number} */
  var _nodeId = 14603328E5;
  /** @type {Array} */
  var hexChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  /** @type {number} */
  var length = 62;
  /**
   * @param {string} number
   * @param {string} num
   * @return {?}
   */
  var zeroPad = function(number, num) {
    return(number + num).slice(-number.length);
  };
  /**
   * @param {Object} o
   * @return {undefined}
   */
  var Type = function(o) {
    this._opt = o || {};
  };
  return Type.prototype = {
    /**
     * @param {number} w
     * @param {number} size
     * @return {?}
     */
    _toBase : function(w, size) {
      var types = this._opt;
      var chars = types.symbols || hexChars;
      /** @type {string} */
      var result = "";
      if (size > chars.length || 1 >= size) {
        return false;
      }
      for (;w >= 1;) {
        result = chars[w - size * Math.floor(w / size)] + result;
        /** @type {number} */
        w = Math.floor(w / size);
      }
      return 11 > size ? parseInt(result) : result;
    },
    /**
     * @return {?}
     */
    _salts : function() {
      var self = this;
      var len = self._opt;
      var a = len.salts || 2;
      /** @type {string} */
      var optsData = "";
      /** @type {number} */
      var b = 0;
      for (;a > b;b++) {
        /** @type {number} */
        var parameters = Math.floor(3844 * Math.random());
        optsData += zeroPad("00", self._toBase(parameters, length));
      }
      return optsData;
    },
    /**
     * @return {?}
     */
    gen : function() {
      var self = this;
      var options = self._opt;
      var ns = options.interval || 1;
      var node = options.initTime || _nodeId;
      /** @type {number} */
      var s = ns > 0 ? Math.floor(((new Date).getTime() - node) / ns) : 0;
      var dim = self._salts();
      return 0 === s ? dim : self._toBase(s, length) + dim;
    }
  }, {
    /**
     * @param {?} var_args
     * @return {?}
     */
    inst : function(var_args) {
      return new Type(var_args);
    },
    /**
     * @param {Object} name
     * @return {?}
     */
    gen : function(name) {
      return(new Type(name)).gen();
    },
    /**
     * @return {?}
     */
    uuid : function() {
      return(new Type({
        salts : 4
      })).gen();
    }
  };
});

!function(first, definition) {
  if ("function" == typeof define && define.amd) {
    define(definition);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = definition();
    } else {
      var i = first.jh2d;
      var jQuery = definition();
      /**
       * @return {?}
       */
      jQuery.noConflict = function() {
        return first.jh2d = i, jQuery;
      };
      first.jh2d = jQuery;
    }
  }
}(this, function() {
  /**
   * @param {number} x
   * @param {number} v
   * @param {number} width
   * @param {number} f
   * @param {number} radians
   * @return {?}
   */
  function scale(x, v, width, f, radians) {
    return{
      x : x + width * Math.cos(radians),
      y : v + f * Math.sin(radians)
    };
  }
  /**
   * @param {?} a
   * @param {?} o
   * @param {number} value
   * @param {number} step
   * @param {number} recurring
   * @param {number} lab
   * @param {boolean} dataAndEvents
   * @param {number} opt_isDefault
   * @return {?}
   */
  function slice(a, o, value, step, recurring, lab, dataAndEvents, opt_isDefault) {
    var result = scale(a, o, value, step, recurring);
    var s = scale(a, o, value, step, lab);
    /** @type {Array} */
    var arr = ["M", result.x, result.y, "A", value, step, 0, void 0 === opt_isDefault ? 1 : opt_isDefault, dataAndEvents ? 1 : 0, s.x, s.y];
    return arr;
  }
  /**
   * @param {number} v
   * @param {?} index
   * @param {number} y
   * @param {number} step
   * @param {number} propName
   * @param {number} recurring
   * @param {boolean} crossScope
   * @param {number} opt_isDefault
   * @return {?}
   */
  function set(v, index, y, step, propName, recurring, crossScope, opt_isDefault) {
    var a = slice(v, index, y, step, propName, recurring, crossScope, opt_isDefault);
    return a[0] = "L", a;
  }
  /** @type {number} */
  var RAD2ANGLE = 180 / Math.PI;
  /** @type {Array} */
  var DASHEDS = [[4, 4], [8, 4, 4, 4], [8, 4, 4, 4, 4, 4, 8, 4]];
  /** @type {number} */
  var v16 = 1;
  /** @type {number} */
  var PREFIX = 2;
  /** @type {number} */
  var OLD = 4;
  /** @type {number} */
  var v8 = 8;
  /** @type {number} */
  var a4 = 10;
  /** @type {function (this:*): string} */
  var core_toString = Object.prototype.toString;
  /** @type {function (this:Object, *): boolean} */
  var __indexOf = Object.prototype.hasOwnProperty;
  /**
   * @param {?} obj
   * @return {?}
   */
  var isArray = function(obj) {
    return "[object Array]" === core_toString.call(obj);
  };
  /**
   * @param {?} obj
   * @param {?} fn
   * @return {?}
   */
  var extend = function(obj, fn) {
    /** @type {number} */
    var msg = -1;
    return each(obj, function(key, type) {
      /** @type {boolean} */
      var e = false;
      if (e = "function" == typeof fn ? fn(key, type) : key === fn) {
        return msg = type, true;
      }
    }), msg;
  };
  /**
   * @param {string} value
   * @return {?}
   */
  var isEmpty = function(value) {
    if (null == value) {
      return true;
    }
    if (value.length > 0) {
      return false;
    }
    if (0 === value.length) {
      return true;
    }
    var prevTag;
    for (prevTag in value) {
      if (__indexOf.call(value, prevTag)) {
        return false;
      }
    }
    return true;
  };
  /**
   * @param {Function} object
   * @param {Function} callback
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  var each = function(object, callback, dataAndEvents) {
    /** @type {number} */
    var step = dataAndEvents ? -1 : 1;
    /** @type {number} */
    var i = step === -1 ? object.length - 1 : 0;
    for (;i < object.length && (i >= 0 && !callback(object[i], i));) {
      i += step;
    }
    return object;
  };
  /**
   * @param {Array} obj
   * @param {?} props
   * @return {?}
   */
  var mixin = function(obj, props) {
    if (void 0 === props) {
      return obj;
    }
    /** @type {Array} */
    var result = [];
    /** @type {boolean} */
    var wasArray = true;
    if (!isArray(props)) {
      /** @type {Array} */
      props = [props];
      /** @type {boolean} */
      wasArray = false;
    }
    /** @type {number} */
    var i = 0;
    for (;i < props.length;i++) {
      var prop = props[i];
      result[result.length] = obj[prop];
    }
    return wasArray ? result : result[0];
  };
  /**
   * @param {Array} array
   * @param {number} index
   * @param {number} i
   * @return {?}
   */
  var write = function(array, index, i) {
    return index !== i && array.splice(i, 1, array.splice(index, 1, array[i])[0]), array;
  };
  /**
   * @param {Object} o
   * @return {?}
   */
  var stringify = function(o) {
    if (null != o && ("object" == typeof o && !(o instanceof HTMLElement))) {
      if (isArray(o)) {
        /** @type {Array} */
        var s = [];
        /** @type {number} */
        var i = 0;
        for (;i < o.length;i++) {
          s[s.length] = stringify(o[i]);
        }
        return s;
      }
      var obj = {};
      var prop;
      for (prop in o) {
        if ("__proto__" !== prop) {
          obj[prop] = stringify(o[prop]);
        }
      }
      return obj;
    }
    return o;
  };
  /**
   * @param {?} opt_attributes
   * @param {Object} obj
   * @param {boolean} recurring
   * @param {?} value
   * @return {?}
   */
  var f = function(opt_attributes, obj, recurring, value) {
    if ("object" == typeof obj) {
      var key;
      for (key in obj) {
        /** @type {boolean} */
        var f = false;
        f = "function" == typeof value ? value(key) : isArray(value) && extend(value, key) !== -1;
        if (!f) {
          if (void 0 === opt_attributes[key] || (null == opt_attributes[key] || recurring)) {
            opt_attributes[key] = stringify(obj[key]);
          }
          if (!(void 0 !== opt_attributes[key] && null != opt_attributes[key])) {
            delete opt_attributes[key];
          }
        }
      }
    }
    return opt_attributes;
  };
  /** @type {Array} */
  var codeSegments = [{
    re : /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
    format : "hex",
    /**
     * @param {(Array|Float32Array)} execResult
     * @return {?}
     */
    parse : function(execResult) {
      return[parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16), 1];
    }
  }, {
    re : /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
    format : "hex",
    /**
     * @param {(Array|Float32Array)} execResult
     * @return {?}
     */
    parse : function(execResult) {
      return[parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16), 1];
    }
  }];
  /**
   * @param {?} text
   * @return {?}
   */
  var read = function(text) {
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      var parser = codeSegments[i];
      var code = parser.re.exec(text);
      var features = code && parser.parse.apply(this, [code]);
      if (features) {
        return features;
      }
    }
    return false;
  };
  /**
   * @param {?} url
   * @param {number} execResult
   * @return {?}
   */
  var parse = function(url, execResult) {
    var px = execResult || -128;
    var tmp = read(url);
    if (tmp) {
      /** @type {number} */
      var j = 0;
      var w = tmp[j++] + px;
      var maxHeight = tmp[j++] + px;
      var value = tmp[j++] + px;
      return w = Math.max(0, Math.min(255, w)), maxHeight = Math.max(0, Math.min(255, maxHeight)), value = Math.max(0, Math.min(255, value)), endsWith([w, maxHeight, value, 1]);
    }
    return url;
  };
  /**
   * @param {?} target
   * @param {number} failing_message
   * @return {?}
   */
  var report = function(target, failing_message) {
    return parse(target, failing_message || 128);
  };
  /**
   * @param {?} object
   * @return {?}
   */
  var freeze = function(object) {
    var data = read(object);
    if (data) {
      /** @type {number} */
      var j = 0;
      /** @type {number} */
      var d = 255 ^ data[j++];
      /** @type {number} */
      var e = 255 ^ data[j++];
      /** @type {number} */
      var f = 255 ^ data[j++];
      return endsWith([d, e, f, 1]);
    }
    return object;
  };
  /**
   * @param {Array} str
   * @return {?}
   */
  var endsWith = function(str) {
    /** @type {number} */
    var endPos = 0;
    return "#" + (1 << 24 | str[endPos++] << 16 | str[endPos++] << 8 | str[endPos++]).toString(16).substr(1);
  };
  /**
   * @param {Array} dataAndEvents
   * @param {Array} v
   * @param {number} angleZ
   * @param {number} expectedNumberOfNonCommentArgs
   * @param {Array} options
   * @return {?}
   */
  var rotate = function(dataAndEvents, v, angleZ, expectedNumberOfNonCommentArgs, options) {
    expectedNumberOfNonCommentArgs = expectedNumberOfNonCommentArgs || 1;
    options = options || [0, 0];
    /** @type {Array} */
    var listenersArr = [];
    var left = dataAndEvents[0];
    var delta = dataAndEvents[1];
    var width = options[0];
    var height = options[1];
    /** @type {boolean} */
    var copyByClone = !!v && (0 !== angleZ || (0 !== width || 0 !== height));
    /** @type {number} */
    var index = 0;
    for (;copyByClone && index < v.length;) {
      var right = v[index] + width;
      var y = v[index + 1] + height;
      /** @type {Array} */
      var o = 0 !== angleZ ? [(right - left) * Math.cos(angleZ) - expectedNumberOfNonCommentArgs * (y - delta) * Math.sin(angleZ) + left, expectedNumberOfNonCommentArgs * (right - left) * Math.sin(angleZ) + (y - delta) * Math.cos(angleZ) + delta] : [right, y];
      /** @type {number} */
      listenersArr[listenersArr.length] = Math.round(1E4 * o[0]) / 1E4;
      /** @type {number} */
      listenersArr[listenersArr.length] = Math.round(1E4 * o[1]) / 1E4;
      index += 2;
    }
    return 0 === listenersArr.length ? v : listenersArr;
  };
  /**
   * @param {Object} self
   * @param {?} value
   * @param {number} expectedNumberOfNonCommentArgs
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  var update = function(self, value, expectedNumberOfNonCommentArgs, dataAndEvents) {
    var px = self.dx || 0;
    var s = self.dy || 0;
    var left = self.x + px;
    var anotherLocalVar = self.y + s;
    var width = self.w;
    var h = self.h;
    var millis = self.initRotate || 0;
    var newMillis = (self.rotate || 0) + millis;
    var node = self.rc || [left + width / 2, anotherLocalVar + h / 2];
    return rotate(node, value, newMillis, expectedNumberOfNonCommentArgs, dataAndEvents ? null : [px, s]);
  };
  /**
   * @param {Array} b
   * @param {Array} a
   * @return {?}
   */
  var comparator = function(b, a) {
    return[a[0] - b[0], a[1] - b[1]];
  };
  /**
   * @param {?} v
   * @param {?} a
   * @return {?}
   */
  var min = function(v, a) {
    var c = comparator(v, a);
    return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
  };
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} size
   * @param {number} height
   * @param {Array} deepDataAndEvents
   * @return {?}
   */
  var addPointXYZ = function(x, y, size, height, deepDataAndEvents) {
    /** @type {number} */
    var aspect = height / size;
    var clientTop = x + size / 2;
    var cy = y + height / 2;
    /** @type {number} */
    var top = deepDataAndEvents[0] - clientTop;
    /** @type {number} */
    var dy = deepDataAndEvents[1] - cy;
    /** @type {number} */
    var version = 0;
    return dy >= Math.abs(top * aspect) && (version = v8), dy <= -1 * Math.abs(top * aspect) && (version = PREFIX), top >= Math.abs(dy / aspect) && (version = v16), top <= -1 * Math.abs(dy / aspect) && (version = OLD), version;
  };
  /**
   * @param {Object} p
   * @param {Object} deepDataAndEvents
   * @param {Function} callback
   * @return {?}
   */
  var create = function(p, deepDataAndEvents, callback) {
    var c = addPointXYZ(p.x, p.y, p.w, p.h, deepDataAndEvents);
    /** @type {Array} */
    var out = [0, 0];
    /** @type {Array} */
    var css = [0, 0];
    /**
     * @param {number} c
     * @return {?}
     */
    var func = function(c) {
      /** @type {number} */
      var b = c / 6;
      /** @type {number} */
      var b_path = b + c / 4;
      /** @type {number} */
      var d = 5 * c / 12;
      return[b, b_path, d];
    };
    /** @type {null} */
    var disp = null;
    var control = c;
    switch(c === v16 || c === OLD ? (disp = func(p.h), out[1] = p.y + disp[0], css[1] = p.y + disp[1], (p.h > 0 && deepDataAndEvents[1] > p.y + p.h / 2 || p.h < 0 && deepDataAndEvents[1] < p.y + p.h / 2) && (out[1] += disp[2], css[1] += disp[2]), p.w < 0 && (control = (OLD | v16) ^ c)) : (disp = func(p.w), out[0] = p.x + disp[0], css[0] = p.x + disp[1], (p.w > 0 && deepDataAndEvents[0] > p.x + p.w / 2 || p.w < 0 && deepDataAndEvents[0] < p.x + p.w / 2) && (out[0] += disp[2], css[0] += disp[2]), p.h < 
    0 && (control = (PREFIX | v8) ^ c)), control) {
      case v16:
        out[0] = p.x + p.w;
        css[0] = p.x + p.w;
        break;
      case PREFIX:
        out[1] = p.y;
        css[1] = p.y;
        break;
      case OLD:
        out[0] = p.x;
        css[0] = p.x;
        break;
      case v8:
        out[1] = p.y + p.h;
        css[1] = p.y + p.h;
    }
    return callback(out, css, c);
  };
  /**
   * @param {Array} x
   * @param {number} pos
   * @return {?}
   */
  var pow = function(x, pos) {
    /** @type {number} */
    var c = 2;
    if (x.length >= 8) {
      /** @type {number} */
      c = 3;
    }
    var y;
    var v;
    /** @type {number} */
    var cnt = 0;
    var start = x[cnt++];
    var t = x[cnt++];
    var end = x[cnt++];
    var bx = x[cnt++];
    var x1 = x[cnt++];
    var method = x[cnt++];
    if (3 === c) {
      y = x[cnt++];
      v = x[cnt++];
    }
    /** @type {Array} */
    var listenersArr = [];
    return 3 === c ? (listenersArr[listenersArr.length] = Math.pow(1 - pos, 3) * start + 3 * pos * Math.pow(1 - pos, 2) * end + 3 * Math.pow(pos, 2) * (1 - pos) * x1 + Math.pow(pos, 3) * y, listenersArr[listenersArr.length] = Math.pow(1 - pos, 3) * t + 3 * pos * Math.pow(1 - pos, 2) * bx + 3 * Math.pow(pos, 2) * (1 - pos) * method + Math.pow(pos, 3) * v) : (listenersArr[listenersArr.length] = Math.pow(1 - pos, 2) * start + 2 * pos * (1 - pos) * end + Math.pow(pos, 2) * x1, listenersArr[listenersArr.length] = 
    Math.pow(1 - pos, 2) * t + 2 * pos * (1 - pos) * bx + Math.pow(pos, 2) * method), listenersArr;
  };
  /**
   * @param {Array} x
   * @param {Array} settings
   * @return {?}
   */
  var generate = function(x, settings) {
    /** @type {number} */
    var that = 0.001;
    /** @type {Array} */
    var out = [];
    var t = pow(x, 0);
    var l = t;
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var scrollTop = 0;
    /** @type {Array} */
    var copies = [];
    /** @type {number} */
    var e = that;
    for (;e <= 1;e += that) {
      t = pow(x, e);
      var args = min(l, t);
      if (!(args < settings[i] / 10)) {
        scrollTop += args;
        l = t;
        if (scrollTop >= settings[i]) {
          if (i % 2 === 0) {
            out.push(copies);
          }
          /** @type {number} */
          i = (i + 1) % settings.length;
          /** @type {Array} */
          copies = [];
          /** @type {number} */
          scrollTop = 0;
        }
        if (i % 2 === 0) {
          copies.push(t[0], t[1]);
        }
      }
    }
    return copies.length > 0 && out.push(copies), out;
  };
  /**
   * @param {Array} dataAndEvents
   * @param {Array} deepDataAndEvents
   * @param {Array} v
   * @param {Array} buffer
   * @return {?}
   */
  var clone = function(dataAndEvents, deepDataAndEvents, v, buffer) {
    var t = dataAndEvents[0];
    var x1 = dataAndEvents[1];
    var b = deepDataAndEvents[0];
    var x2 = deepDataAndEvents[1];
    var x = v[0];
    var z2 = v[1];
    var y3 = buffer[0];
    var z1 = buffer[1];
    /** @type {number} */
    var m = ((b - t) * (x - y3) * (z2 - x1) - x * (b - t) * (z2 - z1) + t * (x2 - x1) * (x - y3)) / ((x2 - x1) * (x - y3) - (b - t) * (z2 - z1));
    /** @type {number} */
    var n = ((x2 - x1) * (z2 - z1) * (x - t) - z2 * (x2 - x1) * (x - y3) + x1 * (b - t) * (z2 - z1)) / ((b - t) * (z2 - z1) - (x2 - x1) * (x - y3));
    return[m, n];
  };
  /**
   * @param {Array} b
   * @param {Array} a
   * @param {number} base
   * @param {number} task
   * @return {?}
   */
  var build = function(b, a, base, task) {
    /** @type {Array} */
    var path = [];
    /** @type {number} */
    var totalFiles = a[0] - b[0];
    /** @type {number} */
    var filesSent = a[1] - b[1];
    /** @type {number} */
    var skew = 0;
    /** @type {number} */
    var tth = 0;
    /** @type {number} */
    var d = -1;
    if (0 !== totalFiles) {
      if (0 !== filesSent) {
        /** @type {number} */
        skew = filesSent / totalFiles;
        /** @type {number} */
        tth = Math.atan(skew);
      } else {
        /** @type {number} */
        tth = (totalFiles < 0 ? 1 : 2) * Math.PI;
      }
    } else {
      /** @type {number} */
      tth = Math.PI / 2;
    }
    if (skew < 0) {
      /** @type {number} */
      d = 1;
    }
    if (a[1] < b[1]) {
      d *= -1;
    }
    var y = a[0];
    var x = a[1];
    if (5 === task) {
      /** @type {Array} */
      path = path.concat(slice(y, x, base / 2, base / 2, 2 * Math.PI - 0.001, 0));
    } else {
      /** @type {Array} */
      path = path.concat(["M", y, x]);
      /** @type {Array} */
      var mat1 = [d * base * Math.cos(tth - Math.PI / 6) + y, d * base * Math.sin(tth - Math.PI / 6) + x];
      /** @type {Array} */
      var mat0 = [d * base * Math.cos(tth + Math.PI / 6) + y, d * base * Math.sin(tth + Math.PI / 6) + x];
      /** @type {Array} */
      var vec1 = [mat1[0] + (mat0[0] - mat1[0]) / 2, mat1[1] + (mat0[1] - mat1[1]) / 2];
      switch(path = path.concat(["L", mat1[0], mat1[1]]), task) {
        case 2:
          /** @type {Array} */
          vec1 = [y + (vec1[0] - y) / 2, x + (vec1[1] - x) / 2];
          /** @type {Array} */
          path = path.concat(["L", vec1[0], vec1[1]]);
          break;
        case 3:
          /** @type {Array} */
          vec1 = [y + (vec1[0] - y) / 2, x + (vec1[1] - x) / 2];
          /** @type {Array} */
          path = path.concat(["Q", vec1[0], vec1[1], mat0[0], mat0[1]]);
          break;
        case 4:
          /** @type {Array} */
          vec1 = [vec1[0] + (vec1[0] - y), vec1[1] + (vec1[1] - x)];
          /** @type {Array} */
          path = path.concat(["L", vec1[0], vec1[1]]);
      }
      if (3 !== task) {
        /** @type {Array} */
        path = path.concat(["L", mat0[0], mat0[1]]);
      }
    }
    return path = path.concat(["Z"]);
  };
  /**
   * @param {Object} start
   * @param {number} opt_attributes
   * @param {number} _
   * @return {?}
   */
  var distance = function(start, opt_attributes, _) {
    var count = opt_attributes || 8;
    /** @type {number} */
    var oneDivCount = 2 * Math.PI / count;
    _ = _ || 0;
    var queueHooks = start.x + start.w / 2;
    var value = start.y + start.h / 2;
    /** @type {Array} */
    var result = [];
    /** @type {number} */
    var i = 0;
    for (;i < count;i++) {
      var theta2 = i * oneDivCount + _;
      var key = start.w / 2 * Math.cos(theta2) + queueHooks;
      var tval = start.h / 2 * Math.sin(theta2) + value;
      /** @type {Array} */
      result[result.length] = [key, tval];
    }
    return result;
  };
  /**
   * @param {Object} size
   * @param {number} attributes
   * @param {number} deepDataAndEvents
   * @return {?}
   */
  var reset = function(size, attributes, deepDataAndEvents) {
    var matrix = size.ex || {
      dx : size.w / attributes,
      dy : size.h / attributes
    };
    /** @type {number} */
    var dx = matrix.dx;
    /** @type {number} */
    var dy = matrix.dy;
    var attributesToSet = attributes || 8;
    /** @type {number} */
    var f = 2 * Math.PI / attributesToSet;
    var x = deepDataAndEvents || 0;
    var j = size.x + size.w / 2;
    var value = size.y + size.h / 2;
    /** @type {Array} */
    var result = [];
    /** @type {number} */
    var y = 0;
    for (;y < attributesToSet;y++) {
      var startAngle = y * f + x;
      var tempI = size.w / 2 * Math.cos(startAngle) + j;
      var tval = size.h / 2 * Math.sin(startAngle) + value;
      /** @type {Array} */
      result[result.length] = [tempI, tval];
      var angle = startAngle + f / 2;
      /** @type {number} */
      var i = (size.w - 2 * dx) / 2;
      /** @type {number} */
      var radius = (size.h - 2 * dy) / 2;
      var key = i * Math.cos(angle) + j;
      var assignment = radius * Math.sin(angle) + value;
      /** @type {Array} */
      result[result.length] = [key, assignment];
    }
    return result;
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var draw = function(args) {
    var props = args.ex;
    var length = props.dx;
    var y = props.dy;
    /** @type {number} */
    var result = 0;
    /** @type {number} */
    var width = y - args.h / 2;
    /** @type {number} */
    var angleDegrees = 1;
    if (length !== args.w / 2) {
      /** @type {number} */
      var x = width / (length - args.w / 2);
      /** @type {number} */
      x = x * args.w / args.h;
      if (x < 0) {
        /** @type {number} */
        angleDegrees = -1;
      }
      /** @type {number} */
      result = Math.atan(x);
      if (length < args.w / 2) {
        result += Math.PI;
      }
    } else {
      /** @type {number} */
      angleDegrees = width < 0 ? -1 : 1;
      /** @type {number} */
      result = angleDegrees * Math.PI / 2;
    }
    /** @type {number} */
    var i = result - Math.PI / 12;
    /** @type {number} */
    var value = result + Math.PI / 12;
    return[i, value];
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var run = function(args) {
    var dx = args.ex[0].dx;
    var y = args.ex[0].dy;
    var d = args.ex[1].dx;
    var dy = args.ex[1].dy;
    /** @type {number} */
    var arg = 0;
    /** @type {number} */
    var result = 0;
    /** @type {number} */
    var slope = 0;
    /** @type {number} */
    var alpha = 0;
    /** @type {number} */
    var yp = y - args.h / 2;
    /** @type {number} */
    var cos = dy - args.h / 2;
    return dx !== args.w / 2 ? (arg = yp / (dx - args.w / 2), result = Math.atan(arg), dx < args.w / 2 && (result += Math.PI)) : result = yp < 0 ? -Math.PI / 2 : Math.PI / 2, d !== args.w / 2 ? (slope = cos / (d - args.w / 2), alpha = Math.atan(slope), d < args.w / 2 && (alpha += Math.PI)) : alpha = cos < 0 ? -Math.PI / 2 : Math.PI / 2, alpha <= result && (alpha += 2 * Math.PI), [result, alpha];
  };
  /**
   * @param {string} json
   * @return {?}
   */
  var dispatch = function(json) {
    var result = json.gd || 0;
    var parsedResult = result;
    var ch = json.gdt;
    var dependentResult = isArray(result);
    if (ch) {
      if (!dependentResult) {
        /** @type {Array} */
        parsedResult = [50, 50, 100, 50, 50];
        if ((result & v16) === v16) {
          /** @type {number} */
          parsedResult[0] = 100;
          /** @type {number} */
          parsedResult[3] = 100;
        }
        if ((result & PREFIX) === PREFIX) {
          /** @type {number} */
          parsedResult[1] = 0;
          /** @type {number} */
          parsedResult[4] = 0;
        }
        if ((result & OLD) === OLD) {
          /** @type {number} */
          parsedResult[0] = 0;
          /** @type {number} */
          parsedResult[3] = 0;
        }
        if ((result & v8) === v8) {
          /** @type {number} */
          parsedResult[1] = 100;
          /** @type {number} */
          parsedResult[4] = 100;
        }
      }
    } else {
      if (!dependentResult) {
        /** @type {Array} */
        parsedResult = [0, 0, 0, 0];
        if ((result & v16) === v16) {
          /** @type {number} */
          parsedResult[0] = 100;
          /** @type {number} */
          parsedResult[2] = 0;
        }
        if ((result & PREFIX) === PREFIX) {
          /** @type {number} */
          parsedResult[1] = 0;
          /** @type {number} */
          parsedResult[3] = 100;
        }
        if ((result & OLD) === OLD) {
          /** @type {number} */
          parsedResult[0] = 0;
          /** @type {number} */
          parsedResult[2] = 100;
        }
        if ((result & v8) === v8) {
          /** @type {number} */
          parsedResult[1] = 100;
          /** @type {number} */
          parsedResult[3] = 0;
        }
      }
    }
    var faces = json.gdc;
    if (!isArray(faces)) {
      var arg = json.color || "#ddd";
      var keyName = report(arg);
      var url = parse(arg);
      /** @type {Array} */
      faces = ["0", keyName, "100", url];
    }
    return[parsedResult, faces];
  };
  /**
   * @param {Array} data
   * @param {Array} value
   * @param {Function} cb
   * @return {?}
   */
  var step = function(data, value, cb) {
    /** @type {number} */
    var valuelen = 0;
    /** @type {number} */
    var d = Math.abs(value[valuelen++]);
    /** @type {number} */
    var q = Math.abs(value[valuelen++]);
    var i = value[valuelen++];
    var element = value[valuelen++];
    var container = value[valuelen++];
    var left = value[valuelen++];
    var b = value[valuelen++];
    var right = data[0];
    var a = data[1];
    /** @type {number} */
    var r = (right - left) / 2 * (Math.cos(i) + Math.sin(i));
    /** @type {number} */
    var dx = (a - b) / 2 * (Math.cos(i) - Math.sin(i));
    /** @type {number} */
    var x1Rotated2 = Math.pow(r, 2);
    /** @type {number} */
    var y1Rotated2 = Math.pow(dx, 2);
    /** @type {number} */
    var rx2 = Math.pow(d, 2);
    /** @type {number} */
    var ry2 = Math.pow(q, 2);
    /** @type {number} */
    var variance = x1Rotated2 / rx2 + y1Rotated2 / ry2;
    if (variance > 1) {
      d *= Math.sqrt(variance);
      q *= Math.sqrt(variance);
    }
    /** @type {number} */
    var c = (element === container ? -1 : 1) * Math.sqrt((rx2 * ry2 - rx2 * y1Rotated2 - ry2 * x1Rotated2) / (rx2 * y1Rotated2 + ry2 * x1Rotated2));
    /** @type {number} */
    var x1 = c * (d * dx / q);
    /** @type {number} */
    var dy = c * (-q * r / d);
    /** @type {number} */
    var cmd = x1 * (Math.cos(i) - Math.sin(i)) + (right + left) / 2;
    /** @type {number} */
    var y = dy * (Math.cos(i) + Math.sin(i)) + (a + b) / 2;
    var modelData = sign([1, 0], [(r - x1) / d, (dx - dy) / q]);
    /** @type {number} */
    var isDefault = sign([(r - x1) / d, (dx - dy) / q], [(-r - x1) / d, (-dx - dy) / q]) % (2 * Math.PI);
    return 0 === container && isDefault > 0 ? isDefault -= 2 * Math.PI : 1 === container && (isDefault < 0 && (isDefault += 2 * Math.PI)), cb([cmd, y], modelData, isDefault);
  };
  /**
   * @param {Array} val
   * @param {Array} x
   * @return {?}
   */
  var sign = function(val, x) {
    var z0 = val[0];
    var z1 = val[1];
    var x0 = x[0];
    var x1 = x[1];
    /** @type {number} */
    var numerator = z0 * x0 + z1 * x1;
    /** @type {number} */
    var denominator = Math.sqrt((z0 * z0 + z1 * z1) * (x0 * x0 + x1 * x1));
    /** @type {number} */
    var column = z0 * x1 - z1 * x0 < 0 ? -1 : 1;
    /** @type {number} */
    var i = column * Math.acos(numerator / denominator);
    return i;
  };
  /**
   * @param {Object} s
   * @return {?}
   */
  var log = function(s) {
    var data = s.text;
    if (void 0 !== data) {
      return isArray(data) ? (data = data.join("\n"), s.text = data, log(s)) : "object" == typeof data ? log(data) : data.split(/\n|<br[\/]{0,1}\>/);
    }
  };
  /**
   * @param {Object} config
   * @param {number} params
   * @return {?}
   */
  var init = function(config, params) {
    var data = config.text;
    var color = config.fillStyle || "#fff";
    /** @type {number} */
    var dx = config.w / 2;
    /** @type {number} */
    var offsetY = config.h / 2;
    params = params || setFillAndStroke();
    var fn = params[1];
    /** @type {number} */
    var _len2 = 1;
    /** @type {number} */
    var dy = 0;
    var props = log(config);
    color = freeze(color);
    var options = {
      dx : dx,
      dy : offsetY,
      fill : color,
      align : "center",
      baseline : "middle"
    };
    if (void 0 !== props) {
      if ("object" != typeof data || isArray(data)) {
        _len2 = props.length;
        /** @type {number} */
        dy = options.dy;
        /** @type {number} */
        dy = offsetY - _len2 * fn / 2 + fn / 2;
        /** @type {number} */
        options.dy = dy;
        options.text = config.text;
      } else {
        var result = data.pos;
        _len2 = props.length;
        /** @type {number} */
        dy = options.dy;
        fn = data.size || fn;
        /** @type {number} */
        dy = offsetY - _len2 * fn / 2 + fn / 2;
        /** @type {number} */
        options.dy = dy;
        if (result) {
          if ((result & v16) === v16) {
            options.dx = config.w;
            /** @type {string} */
            options.align = "right";
          }
          if ((result & PREFIX) === PREFIX) {
            /** @type {number} */
            options.dy = 0;
            /** @type {string} */
            options.baseline = "top";
          }
          if ((result & OLD) === OLD) {
            /** @type {number} */
            options.dx = 0;
            /** @type {string} */
            options.align = "left";
          }
          if ((result & v8) === v8) {
            dy = config.h - _len2 * fn + fn;
            options.dy = dy;
            /** @type {string} */
            options.baseline = "bottom";
          }
          /** @type {number} */
          result = (240 & result) >> 4;
          if ((result & v16) === v16) {
            options.dx += config.w;
          }
          if ((result & PREFIX) === PREFIX) {
            options.dy -= config.h;
          }
          if ((result & OLD) === OLD) {
            options.dx -= config.w;
          }
          if ((result & v8) === v8) {
            options.dy += config.h;
          }
        }
        f(options, data, true);
      }
    }
    return options;
  };
  /**
   * @param {HTMLElement} body
   * @return {?}
   */
  var setFillAndStroke = function(body) {
    /** @type {Array} */
    var setFillAndStroke = [16, 16];
    if ("undefined" != typeof document) {
      body = body || document.body;
      /** @type {Element} */
      var div = document.createElement("div");
      /** @type {string} */
      div.style.cssText = "display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:1em";
      div.appendChild(document.createTextNode("M"));
      body.appendChild(div);
      /** @type {Array} */
      setFillAndStroke = [div.offsetWidth, div.offsetHeight];
      body.removeChild(div);
    }
    return setFillAndStroke;
  };
  /**
   * @param {Array} res
   * @param {Array} prop
   * @return {?}
   */
  var hasProp = function(res, prop) {
    /** @type {number} */
    var resLength = 0;
    /** @type {Array} */
    var f = [res[resLength++], res[resLength++]];
    /** @type {Array} */
    var a = [res[resLength++], res[resLength++]];
    /** @type {Array} */
    var b = [res[resLength++], res[resLength++]];
    /** @type {number} */
    var g = (a[1] - f[1]) / (a[0] - f[0]);
    /** @type {number} */
    var h = (a[1] - b[1]) / (a[0] - b[0]);
    /** @type {number} */
    var i = (f[1] - b[1]) / (f[0] - b[0]);
    /** @type {number} */
    var j = (g * (prop[0] - a[0]) - (prop[1] - a[1])) * (g * (b[0] - a[0]) - (b[1] - a[1]));
    /** @type {number} */
    var r = (h * (prop[0] - a[0]) - (prop[1] - a[1])) * (h * (f[0] - a[0]) - (f[1] - a[1]));
    /** @type {number} */
    var c = (i * (prop[0] - f[0]) - (prop[1] - f[1])) * (i * (a[0] - f[0]) - (a[1] - f[1]));
    return j >= 0 && (r >= 0 && c >= 0);
  };
  /**
   * @param {Object} data
   * @param {Object} id
   * @return {?}
   */
  var tick = function(data, id) {
    var c = data.x + (data.dx || 0);
    var response = data.y + (data.dy || 0);
    var width = data.w;
    var dx = data.h;
    /** @type {number} */
    var k = width / Math.abs(width);
    /** @type {number} */
    var d = dx / Math.abs(dx);
    /** @type {number} */
    var a = 3;
    c -= a * k;
    response -= a * d;
    width += 2 * a * k;
    dx += 2 * a * d;
    /** @type {Array} */
    var args = [c, response, c + width, response, c, response + dx, c + width, response + dx];
    return hasProp(args, id) || hasProp(args.slice(2, 8), id);
  };
  /** @type {Array} */
  var context = [1, 3, 2, 6, 4, 12, 8, 9];
  /**
   * @param {Object} value
   * @param {Function} callback
   * @return {?}
   */
  var test = function(value, callback) {
    /** @type {number} */
    var c = 0;
    for (;c < context.length;c++) {
      var result = context[c];
      if (callback(post(value, result), result)) {
        return result;
      }
    }
    return 0;
  };
  /**
   * @param {Object} node
   * @param {number} result
   * @return {?}
   */
  var post = function(node, result) {
    var i = node.x + (node.dx || 0);
    var y1 = node.y + (node.dy || 0);
    var x = node.w;
    var height = node.h;
    /** @type {number} */
    var offset = x / 2;
    /** @type {number} */
    var dy = height / 2;
    var idx = i + offset;
    var y = y1 + dy;
    return(result & v16) === v16 && (idx = i + x), (result & PREFIX) === PREFIX && (y = y1), (result & OLD) === OLD && (idx = i), (result & v8) === v8 && (y = y1 + height), [idx, y];
  };
  /**
   * @param {Object} a
   * @return {?}
   */
  var fn = function(a) {
    var cur = a.x;
    var t2 = a.y;
    var aw = a.w;
    var h = a.h;
    return["M", cur, t2, "l", aw, 0, "l", 0, h, "l", -aw, 0, "z"];
  };
  /** @type {number} */
  var $ = 3.5;
  /** @type {number} */
  var tickOffset = 3;
  /**
   * @param {?} err
   * @param {number} socket
   * @return {?}
   */
  var check = function(err, socket) {
    return socket % 3 === 0 ? concat(err) : error(err);
  };
  /**
   * @param {Array} jqXHR
   * @return {?}
   */
  var error = function(jqXHR) {
    /** @type {number} */
    var value = 2 * tickOffset;
    return fn({
      x : jqXHR[0] - tickOffset,
      y : jqXHR[1] - tickOffset,
      w : value,
      h : value
    });
  };
  /**
   * @param {Array} var_args
   * @return {?}
   */
  var concat = function(var_args) {
    return slice(var_args[0], var_args[1], $, $, 2 * Math.PI - 0.001, 0).concat("Z");
  };
  /**
   * @param {(Array|string)} tasks
   * @return {?}
   */
  var render = function(tasks) {
    /** @type {Array} */
    var r = [];
    /** @type {Array} */
    var args = [];
    /** @type {Array} */
    var path = [];
    /** @type {Array} */
    var x = [];
    /** @type {number} */
    var w = $;
    /**
     * @param {?} arg
     * @param {number} callback
     * @return {undefined}
     */
    var done = function(arg, callback) {
      args = args.concat(check(arg, callback));
    };
    if (!isArray(tasks)) {
      /** @type {Array} */
      tasks = [tasks];
    }
    /** @type {number} */
    var i = 0;
    for (;i < tasks.length;i++) {
      var t = tasks[i];
      var arg = t.x + (t.dx || 0);
      var sibling = t.w;
      var s = arg + sibling / 2;
      var pageUrl = t.y + (t.dy || 0);
      var g = options(t);
      /** @type {Array} */
      r = r.concat(fn(t));
      /** @type {Array} */
      r = r.concat(["M", s, pageUrl, "L", g[0], g[1]]);
      test(t, done);
      /** @type {Array} */
      path = path.concat(slice(g[0], g[1], w, w, 2 * Math.PI - 0.001, 0));
      /** @type {Array} */
      path = path.concat("Z");
      /** @type {Array} */
      x = x.concat(merge(t));
    }
    return{
      style : 2,
      d : r,
      dd : {
        style : 3,
        lw : 0.5,
        d : args,
        dd : {
          fillStyle : "#0f0",
          d : path,
          dd : {
            fillStyle : "#ff0",
            d : x
          }
        }
      }
    };
  };
  /**
   * @param {Array} obj
   * @param {Array} to
   * @return {?}
   */
  var compute = function(obj, to) {
    /** @type {number} */
    var squaredDeltaX = 5;
    var state = obj[0];
    var x0 = obj[1];
    var y2 = to[0];
    var x2 = to[1];
    return getBrowser() && (squaredDeltaX *= 2), Math.pow(x2 - x0, 2) + Math.pow(y2 - state, 2) <= Math.pow(squaredDeltaX + 2, 2);
  };
  /**
   * @param {Object} item
   * @param {string} data
   * @return {?}
   */
  var success = function(item, data) {
    return update(item, data, -1, true);
  };
  /**
   * @param {Object} s
   * @return {?}
   */
  var next = function(s) {
    return "line" === s.type || ("linex" === s.type || ("linexx" === s.type || !!s.conn));
  };
  /**
   * @param {Object} result
   * @param {string} x
   * @return {?}
   */
  var push = function(result, x) {
    var startIdx = result.dx || 0;
    var d = result.dy || 0;
    var t = success(result, x);
    var dependentResult = next(result);
    return t = [t[0] - startIdx, t[1] - d], test(result, function(walkers, dataAndEvents) {
      return dependentResult ? (6 === dataAndEvents || 9 === dataAndEvents) && compute(walkers, t) : compute(walkers, t);
    });
  };
  /**
   * @param {Object} t
   * @param {Function} callback
   * @return {undefined}
   */
  var setup = function(t, callback) {
    var name = t.x;
    var top = t.y;
    var path = t.w;
    var h = t.h;
    var events = t.ex || [];
    var nameEQ = name + path / 2;
    var bottom = top + h / 2;
    /** @type {Array} */
    var bulk = [0, 0];
    /** @type {Array} */
    var paths = [path, h];
    /** @type {number} */
    var ext = 0;
    /** @type {number} */
    var height = 0;
    /** @type {boolean} */
    var basis = false;
    if (!isArray(events)) {
      /** @type {Array} */
      events = [events];
    }
    each(events, function(dataAndEvents, index) {
      /** @type {Array} */
      var fn = [events[index].dx, events[index].dy];
      return ext = fn[0] - bulk[0], height = fn[1] - bulk[1], nameEQ = name + ext / 2, bottom = top + height / 2, name += ext, top += height, (basis = callback([nameEQ, bottom], [name, top], index)) ? basis : void(bulk = fn);
    });
    if (!basis) {
      /** @type {number} */
      ext = paths[0] - bulk[0];
      /** @type {number} */
      height = paths[1] - bulk[1];
      nameEQ = name + ext / 2;
      bottom = top + height / 2;
      name += ext;
      top += height;
      callback([nameEQ, bottom], [name, top], events.length, true);
    }
  };
  /**
   * @param {Object} t
   * @return {?}
   */
  var add = function(t) {
    /** @type {Array} */
    var output = [];
    return output = output.concat(concat([t.x, t.y])), setup(t, function(jqXHR, n) {
      output = output.concat(error(jqXHR));
      output = output.concat(concat(n));
    }), output;
  };
  /**
   * @param {Object} a
   * @return {?}
   */
  var merge = function(a) {
    /** @type {Array} */
    var output = [];
    return setup(a, function(dataAndEvents, n, deepDataAndEvents, ignoreMethodDoesntExist) {
      if (!ignoreMethodDoesntExist) {
        output = output.concat(concat(n));
      }
    }), output;
  };
  /**
   * @param {Object} e
   * @param {string} s
   * @return {?}
   */
  var css = function(e, s) {
    var _ = e.x + (e.dx || 0);
    var type = e.y + (e.dy || 0);
    var events = e.ex || [];
    /** @type {number} */
    var ret = -1;
    var t = success(e, s);
    if (!isArray(events)) {
      /** @type {Array} */
      events = [events];
    }
    /** @type {number} */
    var i = 0;
    for (;i < events.length;i++) {
      /** @type {Array} */
      var types = [events[i].dx, events[i].dy];
      if (compute([_ + types[0], type + types[1]], t)) {
        /** @type {number} */
        ret = i;
        break;
      }
    }
    return ret;
  };
  /**
   * @param {Object} obj
   * @param {string} x
   * @return {?}
   */
  var position = function(obj, x) {
    var rowOffset = obj.dx || 0;
    var colOffset = obj.dy || 0;
    var to = success(obj, x);
    /** @type {number} */
    var text = -1;
    return to = [to[0] - rowOffset, to[1] - colOffset], setup(obj, function(walkers, dataAndEvents, textAlt) {
      if (compute(walkers, to)) {
        return text = textAlt, true;
      }
    }), text;
  };
  /**
   * @param {Object} size
   * @param {number} i
   * @param {Array} dataAndEvents
   * @return {?}
   */
  var Vector = function(size, i, dataAndEvents) {
    var width = size.w;
    var h = size.h;
    var pattern = size.ex || [];
    /** @type {Array} */
    var r = [0, 0];
    /** @type {Array} */
    var udataCur = [width, h];
    return isArray(pattern) || (pattern = [pattern]), i - 1 >= 0 && (r = [pattern[i - 1].dx, pattern[i - 1].dy]), i + 1 < pattern.length && (udataCur = [pattern[i + 1].dx, pattern[i + 1].dy]), cb(r, udataCur, [dataAndEvents[0] - size.x, dataAndEvents[1] - size.y]);
  };
  /**
   * @param {Object} self
   * @param {Object} opts
   * @param {boolean} dataAndEvents
   * @return {undefined}
   */
  var format = function(self, opts, dataAndEvents) {
    var funcs = self.ex || [];
    if (!isArray(funcs)) {
      /** @type {Array} */
      funcs = [funcs];
    }
    each(funcs, "function" == typeof opts ? opts : function(matrix) {
      if (dataAndEvents) {
        matrix.dx *= opts[0];
        matrix.dy *= opts[1];
      } else {
        matrix.dx += opts[0];
        matrix.dy += opts[1];
      }
    });
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var options = function(e) {
    var x = e.x;
    var w = e.w;
    var xm = x + w / 2;
    var y = e.y;
    var delta = e.h;
    /** @type {number} */
    var direction = delta / Math.abs(delta);
    /** @type {number} */
    var yp = y - 20 * direction;
    return[xm, yp];
  };
  /**
   * @param {Object} result
   * @param {string} x
   * @return {?}
   */
  var process = function(result, x) {
    var rowOffset = result.dx || 0;
    var colOffset = result.dy || 0;
    var to = success(result, x);
    return to = [to[0] - rowOffset, to[1] - colOffset], compute(options(result), to);
  };
  /**
   * @return {?}
   */
  var getBrowser = function() {
    return "ontouchstart" in window || (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
  };
  /** @type {Array} */
  var cursorMap = ["e-resize", "ne-resize", "n-resize", "nw-resize", "w-resize", "sw-resize", "s-resize", "se-resize"];
  /**
   * @param {number} params
   * @param {number} init
   * @return {?}
   */
  var animate = function(params, init) {
    params = extend(context, params);
    init = init || 0;
    /** @type {number} */
    var val = 2 * Math.PI;
    return init %= val, init < 0 && (init += val), params -= Math.floor(4 * init / Math.PI) - 8, cursorMap[params % 8];
  };
  /**
   * @param {(Array|Int8Array|Uint8Array)} args
   * @param {Function} callback
   * @return {undefined}
   */
  var handle = function(args, callback) {
    /** @type {Array} */
    var index = [0, 0];
    /** @type {null} */
    var parent = null;
    /** @type {number} */
    var fun = 0;
    /** @type {number} */
    var openElement = 0;
    /** @type {number} */
    var irange = 0;
    /** @type {number} */
    var totalW = 0;
    /** @type {number} */
    var tag = 0;
    /** @type {number} */
    var dim = 0;
    /** @type {number} */
    var options = 0;
    /** @type {number} */
    var arg = 0;
    /** @type {number} */
    var version = 0;
    /** @type {number} */
    var lastArg = 0;
    /** @type {number} */
    var _ref = 0;
    /** @type {string} */
    var form = "mlqcsaz";
    /** @type {Array} */
    var to = parent || [0, 0];
    /** @type {number} */
    var i = 0;
    for (;i < args.length;) {
      var method = args[i++];
      var t = to[0];
      var element = to[1];
      /** @type {number} */
      var end = 0;
      /** @type {number} */
      var w = 0;
      /** @type {boolean} */
      var value = false;
      switch(form.indexOf(method) !== -1 && (end = to[0], w = to[1], method = method.toUpperCase()), method) {
        case "M":
          t = args[i++] + end;
          element = args[i++] + w;
          /** @type {Array} */
          index = [t, element];
          value = callback(method, index);
          break;
        case "L":
          fun = t;
          openElement = element;
          t = args[i++] + end;
          element = args[i++] + w;
          value = callback(method, parent, [t, element]);
          break;
        case "Q":
          fun = t;
          openElement = element;
          irange = args[i++] + end;
          totalW = args[i++] + w;
          t = args[i++] + end;
          element = args[i++] + w;
          value = callback(method, parent, [irange, totalW, t, element]);
          break;
        case "C":
          fun = t;
          openElement = element;
          irange = args[i++] + end;
          totalW = args[i++] + w;
          tag = args[i++] + end;
          dim = args[i++] + w;
          t = args[i++] + end;
          element = args[i++] + w;
          value = callback(method, parent, [irange, totalW, tag, dim, t, element]);
          break;
        case "S":
          fun = t;
          openElement = element;
          /** @type {number} */
          irange = 2 * t - tag;
          /** @type {number} */
          totalW = 2 * element - dim;
          tag = args[i++] + end;
          dim = args[i++] + w;
          t = args[i++] + end;
          element = args[i++] + w;
          value = callback(method, parent, [irange, totalW, tag, dim, t, element]);
          break;
        case "A":
          options = args[i++];
          arg = args[i++];
          version = args[i++];
          lastArg = args[i++];
          _ref = args[i++];
          t = args[i++] + end;
          element = args[i++] + w;
          value = callback(method, parent, [options, arg, version, lastArg, _ref, t, element]);
          break;
        case "Z":
          value = callback(method, parent, index);
          break;
        default:
          console.log("cannot parse:" + args[i - 1]);
      }
      if (parent || (parent = to), parent[0] = t, parent[1] = element, value) {
        break;
      }
    }
  };
  /**
   * @param {Object} req
   * @param {Function} func
   * @return {undefined}
   */
  var compile = function(req, func) {
    /** @type {number} */
    var val = 0;
    /** @type {number} */
    var value = 0;
    /** @type {Array} */
    var result = [];
    /** @type {Array} */
    var options = [];
    handle(req, function(c) {
      switch(c) {
        case "M":
          if (value !== val) {
            /** @type {Array} */
            options[options.length] = [value, val];
            value = val;
          }
          val += 3;
          break;
        case "L":
          val += 3;
          break;
        case "Q":
          val += 5;
          break;
        case "C":
          val += 7;
          break;
        case "S":
          val += 5;
          break;
        case "A":
          val += 8;
          break;
        case "Z":
          val += 1;
          /** @type {Array} */
          result[result.length] = [value, val];
          value = val;
      }
    });
    if (value !== val) {
      /** @type {Array} */
      options[options.length] = [value, val];
    }
    func(result, options);
  };
  /**
   * @param {Object} source
   * @param {Object} data
   * @return {?}
   */
  var template = function(source, data) {
    /** @type {number} */
    var u = 0;
    return compile(source, function(b, codeSegments) {
      /** @type {null} */
      var options = null;
      /** @type {boolean} */
      var c = false;
      /** @type {number} */
      var bi = 0;
      for (;bi < b.length;bi++) {
        if (options = b[bi], open(source.slice(options[0], options[1]), data) && (c = !c), move(source.slice(options[0], options[1]), data)) {
          /** @type {number} */
          u = 1;
          break;
        }
      }
      if (c && (u = 1), 0 === u) {
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          if (options = codeSegments[i], move(source.slice(options[0], options[1]), data)) {
            /** @type {number} */
            u = 2;
            break;
          }
        }
      }
    }), u;
  };
  /**
   * @param {Array} key
   * @param {Array} value
   * @param {Array} buffer
   * @return {?}
   */
  var put = function(key, value, buffer) {
    return value[1] > buffer[1] != key[1] > buffer[1] && buffer[0] < (key[0] - value[0]) * (buffer[1] - value[1]) / (key[1] - value[1]) + value[0];
  };
  /**
   * @param {(Array|Int8Array|Uint8Array)} e
   * @param {Object} data
   * @return {?}
   */
  var open = function(e, data) {
    /** @type {boolean} */
    var perm = false;
    return handle(e, function(c, node, b) {
      switch(c) {
        case "Z":
        ;
        case "L":
          if (put(node, b, data)) {
            /** @type {boolean} */
            perm = !perm;
          }
          break;
        case "Q":
        ;
        case "C":
          /** @type {number} */
          var size = 1 / Math.sqrt(Math.pow(b[b.length - 1] - node[1], 2) + Math.pow(b[b.length - 2] - node[0], 2));
          /** @type {Array} */
          var current = node;
          var x = node.concat(b);
          /** @type {number} */
          var i = size;
          for (;i <= 1;i += size) {
            var value = pow(x, i);
            if (put(current, value, data)) {
              /** @type {boolean} */
              perm = !perm;
            }
            current = value;
          }
          break;
        case "A":
          step(node, b, function(a, line, dir) {
            if (a[1] + b[1] > data[1] != a[1] - b[1] > data[1]) {
              /** @type {number} */
              var vcount = dir < 0 ? -1 : 1;
              var l = line + dir;
              /** @type {number} */
              var i = line;
              /** @type {Array} */
              var current = node;
              for (;1 === vcount ? i < l : i > l;) {
                i += 0.0872 * vcount;
                /** @type {Array} */
                var udataCur = [a[0] + b[0] * Math.cos(i), a[1] + b[1] * Math.sin(i)];
                if (put(current, udataCur, data)) {
                  /** @type {boolean} */
                  perm = !perm;
                }
                /** @type {Array} */
                current = udataCur;
              }
            }
          });
      }
    }), perm;
  };
  /**
   * @param {(Array|Int8Array|Uint8Array)} e
   * @param {Array} to
   * @return {?}
   */
  var move = function(e, to) {
    /** @type {boolean} */
    var result = false;
    return handle(e, function(c, results, data) {
      switch(c) {
        case "Z":
        ;
        case "L":
          if (results && (result = cb(results, data, to)), result) {
            return result;
          }
          break;
        case "Q":
        ;
        case "C":
          /** @type {number} */
          var size = 1 / Math.sqrt(Math.pow(data[data.length - 1] - results[1], 2) + Math.pow(data[data.length - 2] - results[0], 2));
          var text = results.concat(data);
          /** @type {number} */
          var i = size;
          for (;i <= 1;i += size) {
            var code = pow(text, i);
            if (result = compute(code, to)) {
              return result;
            }
          }
          break;
        case "A":
          step(results, data, function(from, start, delta) {
            /** @type {number} */
            var value = Math.atan2(to[1] - from[1], to[0] - from[0]);
            /** @type {number} */
            var h = delta < 0 ? -1 : 1;
            var end = start + delta;
            if (value = parseInt(100 * value) / 100, start = parseInt(100 * start) / 100, end = parseInt(100 * end) / 100, h === -1 ? (value !== start && (value >= 0 && (delta < -Math.PI && (value -= parseInt(2 * Math.PI * 100) / 100))), result = value <= start && value >= end) : (value !== start && (value <= 0 && (delta > Math.PI && (value += parseInt(2 * Math.PI * 100) / 100))), result = value >= start && value <= end), result) {
              /** @type {Array} */
              var suiteView = [from[0] + data[0] * Math.cos(value), from[1] + data[1] * Math.sin(value)];
              return result = compute(suiteView, to);
            }
          });
      }
    }), result;
  };
  /**
   * @param {?} r
   * @param {?} value
   * @param {?} n
   * @return {?}
   */
  var cb = function(r, value, n) {
    var mn = min(r, value);
    var key = min(n, value);
    var h = min(n, r);
    /** @type {boolean} */
    var x = key + h <= mn + 1;
    return x;
  };
  /**
   * @param {Array} obj
   * @param {Array} attr
   * @return {?}
   */
  var max = function(obj, attr) {
    var p = obj[0];
    var r = obj[1];
    var alpha = attr[0];
    var g = attr[1];
    /** @type {number} */
    var q = Math.min(p, alpha);
    /** @type {number} */
    var h = Math.max(p, alpha);
    /** @type {number} */
    var min = Math.min(r, g);
    /** @type {number} */
    var max = Math.max(r, g);
    return[q, min, h, max];
  };
  /**
   * @param {(Array|Int8Array|Uint8Array)} b
   * @param {Object} l
   * @return {?}
   */
  var zoom = function(b, l) {
    var a = max([l.x, l.y], [l.x + l.w, l.y + l.h]);
    /** @type {number} */
    var i = 0;
    return a[i] >= b[i++] && (a[i] >= b[i++] && (a[i] <= b[i++] && a[i] <= b[i++]));
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var resize = function(e) {
    /** @type {null} */
    var data = null;
    /** @type {number} */
    var j = 0;
    if (isArray(e)) {
      data = resize(e[0]);
      /** @type {number} */
      var i = 1;
      for (;i < e.length;i++) {
        var points = resize(e[i]);
        /** @type {number} */
        j = 0;
        /** @type {number} */
        data[j] = Math.min(data[j], points[j++]);
        /** @type {number} */
        data[j] = Math.min(data[j], points[j++]);
        /** @type {number} */
        data[j] = Math.max(data[j], points[j++]);
        /** @type {number} */
        data[j] = Math.max(data[j], points[j++]);
      }
    } else {
      if (data = max([e.x, e.y], [e.x + e.w, e.y + e.h]), e.ex) {
        /**
         * @param {Object} options
         * @return {undefined}
         */
        var update = function(options) {
          /** @type {Array} */
          var points = [e.x + options.dx, e.y + options.dy];
          /** @type {number} */
          j = 0;
          /** @type {number} */
          data[j] = Math.min(data[j++], points[0]);
          /** @type {number} */
          data[j] = Math.min(data[j++], points[1]);
          /** @type {number} */
          data[j] = Math.max(data[j++], points[0]);
          /** @type {number} */
          data[j] = Math.max(data[j++], points[1]);
        };
        if (isArray(e.ex)) {
          each(e.ex, update);
        } else {
          update(e.ex);
        }
      }
    }
    return data;
  };
  /**
   * @param {Object} e
   * @return {undefined}
   */
  var theText = function(e) {
    var coords = resize(e);
    var time = e.x;
    var mouseY = e.y;
    /** @type {number} */
    e.w = coords[2] - coords[0];
    /** @type {number} */
    e.h = coords[3] - coords[1];
    e.x = coords[0];
    e.y = coords[1];
    format(e, [time - e.x, mouseY - e.y]);
  };
  /**
   * @param {Object} name
   * @param {number} fn
   * @return {?}
   */
  var send = function(name, fn) {
    /** @type {Array} */
    var array = [];
    var t = next(name);
    return test(name, function(jqXHR, dataAndEvents) {
      if (!t || (6 === dataAndEvents && 1 === (1 & fn) || 9 === dataAndEvents && 2 === (2 & fn))) {
        array = array.concat(t ? concat(jqXHR) : error(jqXHR));
      }
    }), array;
  };
  /**
   * @param {Object} id
   * @param {Array} key
   * @return {?}
   */
  var get = function(id, key) {
    /** @type {null} */
    var params = null;
    /** @type {boolean} */
    var stored = false;
    var targetNode = next(id);
    return key = update(id, key, -1, true), test(id, function(owner, dataAndEvents) {
      if (targetNode && (6 !== dataAndEvents && 9 !== dataAndEvents) || (stored = compute(owner, key)), stored) {
        return params = owner, stored;
      }
    }), stored && (params = update(id, params, 1, true)), params;
  };
  /**
   * @param {Object} self
   * @param {Object} args
   * @param {string} data
   * @return {undefined}
   */
  var callback = function(self, args, data) {
    if (isArray(data)) {
      if (isArray(data[0])) {
        self._buildPath(args, data[0]);
        if (!(1 !== (1 & args.style) && null != args.style)) {
          self._buildPath(f({
            opacity : 0.2,
            fillStyle : "#000",
            style : 1
          }, args), data[1]);
        }
      } else {
        self._buildPath(args, data);
      }
      if (args.dd) {
        callback(self, f(args.dd, args, false, ["dd"]), args.dd.d);
      }
    } else {
      if ("object" == typeof data) {
        callback(self, f(data, args), data.d);
      }
    }
  };
  /**
   * @param {?} self
   * @param {Object} res
   * @param {Object} element
   * @param {number} value
   * @param {boolean} deepDataAndEvents
   * @return {undefined}
   */
  var resolve = function(self, res, element, value, deepDataAndEvents) {
    var data = res.d;
    if (deepDataAndEvents || !data && "function" == typeof element[res.type]) {
      data = element[res.type].apply(self, Array.prototype.slice.call(arguments, 1));
    }
    if (res.header) {
      self._buildHeader(res);
    }
    if (data) {
      callback(self, res, data);
      res.d = data;
    }
    if (!isEmpty(res.text)) {
      self._buildText(res, value);
    }
  };
  /**
   * @param {?} obj
   * @param {?} o
   * @param {?} source
   * @param {boolean} deepDataAndEvents
   * @return {undefined}
   */
  var toArray = function(obj, o, source, deepDataAndEvents) {
    var udataCur = setFillAndStroke();
    if (isArray(o)) {
      /** @type {number} */
      var i = 0;
      for (;i < o.length;i++) {
        var val = o[i];
        if (!val.hide) {
          resolve(obj, val, source, udataCur, deepDataAndEvents);
        }
      }
    } else {
      if (!o.hide) {
        resolve(obj, o, source, udataCur, deepDataAndEvents);
      }
    }
  };
  /**
   * @param {Object} box
   * @return {?}
   */
  var remove = function(box) {
    var width = box.w;
    var height = box.h;
    var b1 = box.scale || 1;
    /** @type {number} */
    var size = a4 * b1;
    /** @type {number} */
    var distance = width / size;
    /** @type {number} */
    var dy = 0;
    /** @type {Array} */
    var data = [];
    /** @type {number} */
    var j = 0;
    for (;dy <= distance;dy++) {
      /** @type {string} */
      data[j++] = "M";
      /** @type {number} */
      data[j++] = dy * size;
      /** @type {number} */
      data[j++] = 0;
      /** @type {string} */
      data[j++] = "L";
      /** @type {number} */
      data[j++] = dy * size;
      data[j++] = height;
    }
    /** @type {number} */
    distance = height / size;
    /** @type {number} */
    dy = 0;
    for (;dy <= distance;dy++) {
      /** @type {string} */
      data[j++] = "M";
      /** @type {number} */
      data[j++] = 0;
      /** @type {number} */
      data[j++] = dy * size;
      /** @type {string} */
      data[j++] = "L";
      data[j++] = width;
      /** @type {number} */
      data[j++] = dy * size;
    }
    /** @type {Array} */
    var previous = [];
    return 1 === (1 & box.style) && (previous = previous.concat(["M", box.x, box.y, "l", box.w, 0, "l", 0, box.h, "l", -box.w, 0, "z"])), 2 === (2 & box.style) && (previous = previous.concat(data)), previous;
  };
  var attributes = {};
  return{
    /**
     * @return {?}
     */
    types : function() {
      /** @type {Array.<?>} */
      var resultItems = Array.prototype.slice.call(arguments, 0);
      /** @type {number} */
      var i = 0;
      for (;i < resultItems.length;i++) {
        var result = resultItems[i];
        f(attributes, result);
      }
      return attributes;
    },
    util : {
      RAD2ANGLE : RAD2ANGLE,
      DASHEDS : DASHEDS,
      EAST : v16,
      NORTH : PREFIX,
      WEST : OLD,
      SOUTH : v8,
      /** @type {function (?): ?} */
      isArray : isArray,
      /** @type {function (?, ?): ?} */
      inArray : extend,
      /** @type {function (Array, ?): ?} */
      getArray : mixin,
      /** @type {function (string): ?} */
      isEmpty : isEmpty,
      /** @type {function (Function, Function, boolean): ?} */
      each : each,
      /** @type {function (Array, number, number): ?} */
      arrExch : write,
      /** @type {function (Object): ?} */
      clone : stringify,
      /** @type {function (?, Object, boolean, ?): ?} */
      extend : f,
      /** @type {function (?, number): ?} */
      darkColor : parse,
      /** @type {function (?, number): ?} */
      lightColor : report,
      /** @type {function (?): ?} */
      reverseColor : freeze,
      /** @type {function (Array, Array, number, number, Array): ?} */
      rotate : rotate,
      /** @type {function (Object, ?, number, boolean): ?} */
      spRotate : update,
      /** @type {function (?, ?): ?} */
      distance : min,
      /** @type {function (number, number, number, number, Array): ?} */
      position : addPointXYZ,
      /** @type {function (Object, Object, Function): ?} */
      doRectEx : create,
      /** @type {function (Array, number): ?} */
      bezier : pow,
      /** @type {function (Array, Array): ?} */
      calculateDashedBezier : generate,
      /** @type {function (Array, Array, Array, Array): ?} */
      crossPoint : clone,
      /** @type {function (number, number, number, number, number): ?} */
      polarToCartesian : scale,
      /** @type {function (?, ?, number, number, number, number, boolean, number): ?} */
      describeArc : slice,
      /** @type {function (number, ?, number, number, number, number, boolean, number): ?} */
      describeArcL : set,
      /** @type {function (Array, Array, number, number): ?} */
      arrowHeaderPath : build,
      /** @type {function (Object, number, number): ?} */
      polygon : distance,
      /** @type {function (Object, number, number): ?} */
      star : reset,
      /** @type {function (Object): ?} */
      calcOvalcallout : draw,
      /** @type {function (Object): ?} */
      calcExArc : run,
      /** @type {function (string): ?} */
      gradient : dispatch,
      /** @type {function (Array, Array, Function): ?} */
      arc : step,
      /** @type {function (Object, number): ?} */
      defaultTextOpt : init,
      /** @type {function (Object, Object): ?} */
      inRect : tick,
      /** @type {function (Object, Function): ?} */
      doEdgePoint : test,
      /** @type {function ((Array|string)): ?} */
      edgePointPath : render,
      /** @type {function (Object): ?} */
      linePointPath : add,
      /** @type {function (Object, string): ?} */
      edgePointType : push,
      /** @type {function (number, number): ?} */
      resizeCursor : animate,
      /** @type {function (Object, string): ?} */
      isRotatePoint : process,
      /** @type {function (Array, Array): ?} */
      isNearbyPoint : compute,
      /** @type {function ((Array|Int8Array|Uint8Array), Function): undefined} */
      parseSVG : handle,
      /** @type {function (Object, Object): ?} */
      evalSVGPath : template,
      /** @type {function (Object, string): ?} */
      indexOfEx : css,
      /** @type {function (Object, string): ?} */
      indexOfExHalf : position,
      /** @type {function (Object, number, Array): ?} */
      isOverExLine : Vector,
      /** @type {function (Object, Object, boolean): undefined} */
      updateEx : format,
      /** @type {function (Array, Array): ?} */
      maxRect : max,
      /** @type {function (Object): ?} */
      biggestRect : resize,
      /** @type {function ((Array|Int8Array|Uint8Array), Object): ?} */
      insideRect : zoom,
      /** @type {function (Object): undefined} */
      adjSprite : theText,
      /** @type {function (Object, number): ?} */
      connPointsPath : send,
      /** @type {function (Object, Array): ?} */
      evalConnPoint : get,
      /** @type {function (Object, Function): undefined} */
      parseClosePath : compile,
      /** @type {function (Object): ?} */
      isConnector : next,
      /** @type {function (?, ?, ?, boolean): undefined} */
      renderer : toArray,
      /** @type {function (Object): ?} */
      bgGridPath : remove,
      /** @type {function ((Array|Int8Array|Uint8Array), Array): ?} */
      isOverPath : move,
      /** @type {function (Object): ?} */
      doSplitText : log
    }
  };
}), function(global, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      global.jh2d.canvas = factory(global.jh2d);
    }
  }
}(this, function(exports) {
  var that = exports.util;
  var groups = that.DASHEDS;
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Object} v
   * @param {string} item
   * @param {Array} callback
   * @param {number} e
   * @return {undefined}
   */
  var fn = function(context, v, item, callback, e) {
    that.parseSVG(item, add(context, v, callback, e));
  };
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Object} value
   * @param {Array} options
   * @param {number} i
   * @return {?}
   */
  var add = function(context, value, options, i) {
    var size = options[0];
    var z = options[1];
    /** @type {Array} */
    var result = [0, 0];
    return function(cmd, index, output) {
      if ("A" !== cmd) {
        index = that.spRotate(value, index);
        output = that.spRotate(value, output);
      }
      var x = index[0];
      var y = index[1];
      /** @type {number} */
      var p = 0;
      switch(cmd) {
        case "M":
          context.moveTo(x - size, y - z);
          break;
        case "L":
          result = draw(context, [x - size, y - z], [output[p++] - size, output[p++] - z], i, result);
          break;
        case "Q":
          drawPlayer(context, [x - size, y - z, output[p++] - size, output[p++] - z, output[p++] - size, output[p++] - z], i);
          break;
        case "C":
          drawPlayer(context, [x - size, y - z, output[p++] - size, output[p++] - z, output[p++] - size, output[p++] - z, output[p++] - size, output[p++] - z], i);
          break;
        case "S":
          drawPlayer(context, [x - size, y - z, output[p++] - size, output[p++] - z, output[p++] - size, output[p++] - z], i);
          break;
        case "A":
          bind(context, value, index, output, options, i);
          break;
        case "Z":
          if (i) {
            result = draw(context, [x - size, y - z], [output[p++] - size, output[p++] - z], i, result);
          }
          context.closePath();
          break;
        default:
          console.log("cannot parse:" + cmd);
      }
    };
  };
  /**
   * @param {HTMLCanvasElement} model
   * @param {Object} options
   * @param {string} arr
   * @return {undefined}
   */
  var init = function(model, options, arr) {
    var ctx = model.getContext();
    ctx.save();
    if (options.opacity) {
      ctx.globalAlpha = options.opacity;
    }
    if (options.alpha) {
      /** @type {number} */
      ctx.globalAlpha = 1 - options.alpha;
    }
    var t = options.grc;
    var _ref = void 0 === options.style ? 3 : options.style;
    var res = options.shadow;
    /** @type {number} */
    var resLength = 0;
    /** @type {number} */
    var label = 0;
    /** @type {number} */
    var offset = 0;
    var group = options.dashed;
    if ("transparent" === options.fillStyle && (_ref &= -2), "transparent" === options.strokeStyle && (_ref &= -3), that.isConnector(options) && (_ref = 2), options.style && (_ref = options.style), t && (label = t[0], offset = t[1], ctx.translate(label, offset), ctx.rotate(t[2])), void 0 === group || (that.isArray(group) || (group = groups[group])), ctx.beginPath(), 1 !== (1 & _ref) && group || fn(ctx, options, arr, [label, offset]), res) {
      ctx.save();
      var shadowColor = options.shadowColor || "#aaa";
      ctx.shadowColor = shadowColor;
      ctx.shadowOffsetX = res[resLength++];
      ctx.shadowOffsetY = res[resLength++];
      ctx.shadowBlur = res[resLength++];
      if (2 === (2 & _ref)) {
        ctx.stroke();
      }
      if (1 === (1 & _ref)) {
        ctx.fillStyle = shadowColor;
        ctx.fill();
      }
      ctx.restore();
    }
    if (1 === (1 & _ref)) {
      var data = options.fillStyle || "#fff";
      if ("object" == typeof data) {
        if (void 0 !== data.gd) {
          ctx.fillStyle = update(ctx, options, [label, offset]);
          ctx.fill();
        } else {
          if (data.p) {
            var source = model._buildPattern(data, options);
            if (source) {
              /** @type {string} */
              ctx.fillStyle = "#fff";
              ctx.fill();
              var s = ctx.createPattern(source, data.mode || "repeat");
              if (s) {
                ctx.save();
                ctx.rotate(options.rotate || 0);
                ctx.fillStyle = s;
                ctx.fill();
                ctx.restore();
              }
            }
          } else {
            if (data.url) {
              var img = model._buildPattern(data, options);
              if (img) {
                ctx.save();
                var x = options.x + options.w / 2;
                var y = options.y + options.h / 2;
                ctx.translate(x, y);
                ctx.rotate(options.rotate || 0);
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, options.x - x, options.y - y, options.w, options.h);
                ctx.restore();
              }
            }
          }
        }
      } else {
        ctx.fillStyle = data;
        ctx.fill();
      }
    }
    if (2 === (2 & _ref)) {
      if (group) {
        ctx.beginPath();
        fn(ctx, options, arr, [label, offset], group);
      }
      if (void 0 === options.lw || options.lw > 0) {
        ctx.lineWidth = void 0 === options.lw ? 1 : options.lw;
        ctx.strokeStyle = options.strokeStyle || "#000";
        ctx.stroke();
      }
    }
    ctx.restore();
  };
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Array} pos
   * @param {Array} point
   * @param {(Array|number)} color
   * @param {Array} callback
   * @return {?}
   */
  var draw = function(context, pos, point, color, callback) {
    /** @type {number} */
    var len = 0;
    var cb = callback || [0, 0];
    var stacknum = cb[0];
    var i = cb[1];
    if (color) {
      /** @type {Array} */
      var vN = [point[0] - pos[0], point[1] - pos[1]];
      /** @type {number} */
      len = Math.sqrt(vN[0] * vN[0] + vN[1] * vN[1]);
      for (;;) {
        var segmentLength = color[stacknum % color.length];
        if (i + segmentLength >= len || isNaN(len)) {
          break;
        }
        i += segmentLength;
        /** @type {number} */
        var r = vN[0] / len * i;
        /** @type {number} */
        var yOffset = vN[1] / len * i;
        if (stacknum % 2 === 0) {
          context.lineTo(pos[0] + r, pos[1] + yOffset);
        } else {
          context.moveTo(pos[0] + r, pos[1] + yOffset);
        }
        stacknum++;
      }
      if (stacknum % 2 === 0) {
        context.lineTo(point[0], point[1]);
      } else {
        context.moveTo(point[0], point[1]);
      }
    } else {
      context.lineTo(point[0], point[1]);
    }
    return[stacknum, i - len];
  };
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} items
   * @return {undefined}
   */
  var render = function(ctx, items) {
    /** @type {number} */
    var i = 0;
    for (;i < items.length;i++) {
      var first = items[i];
      if (first.length > 0) {
        ctx.moveTo(first[0], first[1]);
      }
      /** @type {number} */
      var e = 1;
      for (;e < first.length / 2;e++) {
        ctx.lineTo(first[2 * e], first[2 * e + 1]);
      }
    }
  };
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Array} p
   * @param {Object} top
   * @return {undefined}
   */
  var drawPlayer = function(ctx, p, top) {
    if (top) {
      var nodes = that.calculateDashedBezier(p, top);
      render(ctx, nodes);
    } else {
      /** @type {number} */
      var kk = 2;
      if (6 === p.length) {
        ctx.quadraticCurveTo(p[kk++], p[kk++], p[kk++], p[kk++]);
      }
      if (p.length >= 8) {
        ctx.bezierCurveTo(p[kk++], p[kk++], p[kk++], p[kk++], p[kk++], p[kk++]);
      }
    }
  };
  /**
   * @param {HTMLCanvasElement} cb
   * @param {Object} options
   * @param {Array} item
   * @param {Array} success
   * @param {number} args
   * @param {number} value
   * @return {?}
   */
  var callback = function(cb, options, item, success, args, value) {
    return init(cb, that.extend({
      style : 3,
      fillStyle : options.strokeStyle || "#000",
      strokeStyle : options.strokeStyle || "#000"
    }, options, false, ["type", "dashed"]), that.arrowHeaderPath(item, success, args, value));
  };
  /**
   * @param {HTMLCanvasElement} body
   * @param {Object} item
   * @return {undefined}
   */
  var process = function(body, item) {
    var value = item.x;
    var startAngle = item.y;
    var index = item.w;
    var endAngle = item.h;
    var typePattern = item.hz || 12;
    /** @type {Array} */
    var success = [value, startAngle];
    /** @type {Array} */
    var obj = [value + index, startAngle + endAngle];
    /** @type {null} */
    var event = null;
    /** @type {number} */
    var pdataOld = 0;
    /** @type {number} */
    var udataCur = 0;
    if (!(null == item.header)) {
      if (!isNaN(item.header)) {
        /** @type {number} */
        pdataOld = 15 & item.header;
        /** @type {number} */
        udataCur = (240 & item.header) >> 4;
      }
    }
    /** @type {Array} */
    var status = success;
    if (that.isArray(item.ex) && item.ex.length > 0) {
      if (item.ex.length > 0) {
        /** @type {number} */
        var i = 0;
        if (pdataOld) {
          /** @type {number} */
          i = item.ex.length - 1;
          event = item.ex[i];
          /** @type {Array} */
          status = [event.dx + item.x, event.dy + item.y];
          callback(body, item, status, obj, typePattern, pdataOld);
        }
        if (udataCur) {
          /** @type {number} */
          i = 0;
          event = item.ex[i];
          /** @type {Array} */
          status = [event.dx + item.x, event.dy + item.y];
          callback(body, item, status, success, typePattern, udataCur);
        }
      }
    } else {
      if (item.ex && !that.isArray(item.ex)) {
        /** @type {Array} */
        status = [item.ex.dx + item.x, item.ex.dy + item.y];
        if (pdataOld) {
          callback(body, item, status, obj, typePattern, pdataOld);
        }
        if (udataCur) {
          callback(body, item, status, success, typePattern, udataCur);
        }
      } else {
        if (pdataOld) {
          callback(body, item, success, obj, typePattern, pdataOld);
        }
        if (udataCur) {
          callback(body, item, obj, success, typePattern, udataCur);
        }
      }
    }
  };
  /**
   * @param {CanvasRenderingContext2D} path
   * @param {Object} item
   * @param {Object} x
   * @param {Array} context
   * @param {?} args
   * @param {(Array|number)} str
   * @return {undefined}
   */
  var bind = function(path, item, x, context, args, str) {
    that.arc(x, context, function(dataAndEvents, line, dir) {
      /** @type {number} */
      var vcount = dir < 0 ? -1 : 1;
      var l = line + dir;
      /** @type {number} */
      var i = line;
      /** @type {Object} */
      var value = x;
      /** @type {number} */
      var content = 0;
      /** @type {number} */
      var key = 0;
      /**
       * @param {Array} pos
       * @param {Array} collection
       * @return {?}
       */
      var update = function(pos, collection) {
        if (pos = that.spRotate(item, pos), str) {
          content += that.distance(pos, value);
          var label = str[key % str.length];
          if (content > label) {
            /** @type {number} */
            content = 0;
            key++;
          } else {
            if (key % 2 === 0) {
              path.lineTo(pos[0] - collection[0], pos[1] - collection[1]);
            } else {
              path.moveTo(pos[0] - collection[0], pos[1] - collection[1]);
            }
          }
        } else {
          path.lineTo(pos[0] - collection[0], pos[1] - collection[1]);
        }
        return pos;
      };
      for (;1 === vcount ? i < l : i > l;) {
        i += 0.005 * vcount;
        value = update([dataAndEvents[0] + context[0] * Math.cos(i), dataAndEvents[1] + context[1] * Math.sin(i)], args);
      }
      update(context.slice(context.length - 2), args);
    });
  };
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} c
   * @return {?}
   */
  var update = function(ctx, c) {
    var key = c.fillStyle;
    var e = key.gdt || 0;
    var camelKey = that.gradient(key);
    var mat = camelKey[0];
    var colorStops = camelKey[1];
    var dX = c.dx || 0;
    var s = c.dy || 0;
    var i = c.x + dX;
    var anotherLocalVar = c.y + s;
    var w = c.w;
    var y = c.h;
    /** @type {null} */
    var ret = null;
    /** @type {null} */
    var value = null;
    if (0 === e) {
      /** @type {Array} */
      value = [i + w * mat[0] / 100, anotherLocalVar + y * mat[1] / 100, i + w * mat[2] / 100, anotherLocalVar + y * mat[3] / 100];
      if (c.rotate) {
        value = that.spRotate(c, value);
      }
      ret = ctx.createLinearGradient.apply(ctx, value);
    } else {
      var d = i + w * mat[0] / 100;
      var cy = anotherLocalVar + y * mat[1] / 100;
      /** @type {number} */
      var r = Math.max(Math.abs(w), Math.abs(y)) * mat[2] / 100;
      var x = i + w * mat[3] / 100;
      var fy = anotherLocalVar + y * mat[4] / 100;
      ret = ctx.createRadialGradient(x, fy, 0, d, cy, r);
    }
    /** @type {number} */
    var n = 0;
    for (;n < colorStops.length;) {
      ret.addColorStop(colorStops[n] / 100, colorStops[n + 1]);
      n += 2;
    }
    return ret;
  };
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} self
   * @param {number} option
   * @return {undefined}
   */
  var drawText = function(ctx, self, option) {
    ctx.save();
    var margin = self.x + (self.dx || 0);
    var top = self.y + (self.dy || 0);
    var width = self.w;
    var h = self.h;
    var _nodeId = self.initRotate || 0;
    var node = self.rotate || _nodeId;
    var options = that.defaultTextOpt(self, option);
    var str = options.text;
    var d = options.dx;
    var y = options.dy;
    var xs = self.rc || [margin + width / 2, top + h / 2];
    /** @type {number} */
    var x = 0;
    /** @type {number} */
    var height = 0;
    var dy = options.size || option[1];
    if (void 0 !== str && null != str) {
      str = that.doSplitText(self);
      if (0 !== node) {
        x = xs[0];
        height = xs[1];
        ctx.translate(x, height);
        ctx.rotate(node);
      }
      ctx.textAlign = options.align || "center";
      ctx.textBaseline = options.baseline || "middle";
      ctx.fillStyle = options.fill;
      /** @type {string} */
      ctx.font = (options.style || "normal") + " " + dy + "pt " + (options.font || "serif");
      /** @type {number} */
      var i = 0;
      for (;i < str.length;i++) {
        var label = str[i];
        ctx.fillText(label, margin + d - x, top + y - height + i * dy);
      }
    }
    ctx.restore();
  };
  /**
   * @param {?} args
   * @return {undefined}
   */
  var constructor = function(args) {
    this._opt = args;
    this._ctx = args.canvas.getContext("2d");
  };
  constructor.prototype = {
    /**
     * @param {?} obj
     * @param {?} label
     * @return {undefined}
     */
    renderer : function(obj, label) {
      var suiteView = this;
      var pluginInfo = suiteView._opt;
      that.renderer(suiteView, obj, label || pluginInfo.types);
    },
    /**
     * @param {Object} item
     * @param {number} str
     * @return {undefined}
     */
    _buildText : function(item, str) {
      drawText(this.getContext(), item, str);
    },
    /**
     * @param {Object} child
     * @return {undefined}
     */
    _buildHeader : function(child) {
      process(this, child);
    },
    /**
     * @param {Object} method
     * @param {string} head
     * @return {undefined}
     */
    _buildPath : function(method, head) {
      init(this, method, head);
    },
    /**
     * @return {?}
     */
    getContext : function() {
      return this._ctx;
    },
    /**
     * @return {undefined}
     */
    save : function() {
      this.getContext().save();
    },
    /**
     * @return {undefined}
     */
    restore : function() {
      this.getContext().restore();
    },
    /**
     * @return {undefined}
     */
    clear : function() {
      var self = this;
      var params = self._opt;
      var canvas = params.canvas;
      var context = self.getContext();
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    /**
     * @param {number} x
     * @param {?} basis
     * @return {undefined}
     */
    scale : function(x, basis) {
      this.getContext().scale(x, basis);
    },
    /**
     * @param {Object} options
     * @return {?}
     */
    _buildPattern : function(options) {
      var self = this;
      var config = self._opt;
      var fullName = options.p || "";
      /** @type {null} */
      var can = null;
      /** @type {null} */
      var tempCtx = null;
      var data = traced[fullName] || {};
      if (0 === fullName.indexOf("p_")) {
        can = config.pcanvas;
        can.width = data.sw || 8;
        can.height = data.sh || 8;
        var e = new constructor({
          canvas : can
        });
        /** @type {Array} */
        var html = [];
        if (e.clear(), e.save(), options.bg && (html[html.length] = {
          type : "rect",
          x : 0,
          y : 0,
          w : can.width,
          h : can.height,
          style : 1,
          fillStyle : options.bg
        }), that.isArray(data)) {
          /** @type {number} */
          var i = 0;
          for (;i < data.length;i++) {
            html[html.length] = that.extend({
              x : 0,
              y : 0,
              w : 8,
              h : 8,
              fillStyle : options.fg || "#fff",
              strokeStyle : options.fg || "#000"
            }, data[i], true);
          }
        } else {
          html[html.length] = that.extend({
            x : 0,
            y : 0,
            w : 8,
            h : 8,
            fillStyle : options.fg || "#fff",
            strokeStyle : options.fg || "#000"
          }, data, true);
        }
        e.renderer(html, config.types);
        e.restore();
      } else {
        if (0 === fullName.indexOf("t_") && config.pimage) {
          can = config.pcanvas;
          can.width = data.w || 50;
          can.height = data.h || 50;
          tempCtx = can.getContext("2d");
          var chunkWidth = data.x || 0;
          var y = data.y || 0;
          var widthDiff = data.w || 50;
          var chunkHeight = data.h || 50;
          tempCtx.drawImage(config.pimage, chunkWidth, y, widthDiff, chunkHeight, 0, 0, widthDiff, chunkHeight);
        } else {
          if (options.url) {
            var img = resources[options.url];
            if (img) {
              if ("undefined" != typeof img.naturalWidth && 0 !== img.naturalWidth) {
                return img;
              }
            } else {
              /** @type {Image} */
              img = new Image;
              /**
               * @return {undefined}
               */
              img.onload = function() {
                if ("function" == typeof config.onResourceLoad) {
                  config.onResourceLoad(img);
                }
              };
              /** @type {Image} */
              resources[options.url] = img;
              img.src = options.url;
            }
          }
        }
      }
      return can;
    }
  };
  var traced = {
    p_x1 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 10,
      sh : 10,
      style : 2
    },
    p_x2 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 9,
      sh : 9,
      style : 2
    },
    p_x3 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 8,
      sh : 8,
      style : 2
    },
    p_x4 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 7,
      sh : 7,
      style : 2
    },
    p_x5 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 6,
      sh : 6,
      style : 2
    },
    p_x6 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 5,
      sh : 5,
      style : 2
    },
    p_x7 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 4,
      sh : 4,
      style : 2
    },
    p_x8 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 3,
      sh : 3,
      style : 2
    },
    p_x9 : {
      type : "x",
      w : 1,
      h : 1,
      sw : 2,
      sh : 2,
      style : 2
    },
    p_l1 : {
      type : "line"
    },
    p_l2 : {
      type : "line",
      dx : 8,
      w : -8
    },
    p_l3 : {
      type : "line",
      sw : 4,
      sh : 4
    },
    p_l4 : {
      type : "line",
      sw : 4,
      sh : 4,
      dx : 4,
      w : -4,
      h : 4
    },
    p_l5 : {
      type : "line",
      lw : 2
    },
    p_l6 : {
      type : "line",
      lw : 2,
      dx : 8,
      w : -8
    },
    p_l7 : {
      type : "line",
      w : 0
    },
    p_l8 : {
      type : "line",
      h : 0
    },
    p_l9 : {
      type : "line",
      dx : 2,
      w : 0,
      lw : 2
    },
    p_20 : {
      type : "line",
      dy : 2,
      h : 0,
      lw : 2
    },
    p_21 : {
      type : "line",
      w : 0,
      sw : 4,
      sh : 4
    },
    p_22 : {
      type : "line",
      h : 0,
      sw : 4,
      sh : 4
    },
    p_29 : [{
      type : "line",
      w : 0
    }, {
      type : "line",
      h : 0
    }],
    p_30 : [{
      type : "line"
    }, {
      type : "line",
      dx : 8,
      w : -8
    }],
    p_31 : [{
      type : "line",
      dy : 1,
      h : 0
    }, {
      type : "line",
      dx : 7,
      h : 4,
      w : 0
    }, {
      type : "line",
      dy : 5,
      h : 0,
      w : 8,
      lw : 1
    }, {
      type : "line",
      dy : 4,
      dx : 3,
      h : 4,
      w : 0,
      lw : 1
    }],
    t_t0 : {
      x : 0
    },
    t_t1 : {
      x : 52
    },
    t_t2 : {
      x : 102
    },
    t_t3 : {
      x : 155
    },
    t_t4 : {
      x : 205
    },
    t_t5 : {
      x : 0,
      y : 52
    },
    t_t6 : {
      x : 52,
      y : 52
    },
    t_t7 : {
      x : 102,
      y : 52
    },
    t_t8 : {
      x : 155,
      y : 52
    },
    t_t9 : {
      x : 205,
      y : 52
    },
    t_t10 : {
      x : 0,
      y : 103
    },
    t_t11 : {
      x : 52,
      y : 103
    },
    t_t12 : {
      x : 103,
      y : 103
    },
    t_t13 : {
      x : 155,
      y : 103
    },
    t_t14 : {
      x : 206,
      y : 103
    },
    t_t15 : {
      x : 0,
      y : 155
    },
    t_t16 : {
      x : 52,
      y : 155
    },
    t_t17 : {
      x : 102,
      y : 155
    },
    t_t18 : {
      x : 155,
      y : 155
    },
    t_t19 : {
      x : 205,
      y : 155
    },
    t_t20 : {
      x : 0,
      y : 205
    },
    t_t21 : {
      x : 52,
      y : 205
    },
    t_t22 : {
      x : 102,
      y : 206
    },
    t_t23 : {
      x : 155,
      y : 205
    },
    t_t24 : {
      x : 205,
      y : 205
    }
  };
  var resources = {};
  return{
    /**
     * @param {string} opt_attributes
     * @return {?}
     */
    create : function(opt_attributes) {
      return new constructor(opt_attributes);
    }
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      var root = dataAndEvents.jh2d;
      root.svg = factory(root);
    }
  }
}(this, function(exports) {
  var $ = exports.util;
  var find = $.RAD2ANGLE;
  var cache = $.DASHEDS;
  var parseInt = $.gradient;
  /**
   * @param {string} color
   * @return {?}
   */
  var draw = function(color) {
    /** @type {null} */
    var bgr = null;
    if ("object" == typeof color) {
      if (color.gd || color.gdt) {
        var a = parseInt(color);
        /** @type {string} */
        bgr = "url(#" + format(a[0], a[1]) + ")";
      }
    } else {
      /** @type {string} */
      bgr = color;
    }
    return bgr || "#fff";
  };
  /**
   * @param {Object} options
   * @return {?}
   */
  var set = function(options) {
    /** @type {null} */
    var result = null;
    /** @type {null} */
    var name = null;
    /** @type {string} */
    var optsData = "";
    var hs = options.style;
    var color = options.fillStyle;
    if ("line" === options.type && (hs = hs || 2), hs ? (result = 1 === (1 & hs) ? draw(color) : "none", name = 2 === (2 & hs) ? draw(options.strokeStyle || "#000") : null) : (name = draw("#000"), result = draw(color)), "object" == typeof color) {
      if (color.gd || color.gdt) {
        var a = parseInt(color);
        /** @type {string} */
        result = "url(#" + format(a[0], a[1]) + ")";
      } else {
        /** @type {string} */
        result = 1 === (1 & hs) ? "#fff" : "none";
      }
    }
    optsData += "fill:" + result + ";";
    if (name) {
      optsData += "stroke:" + name + ";stroke-width:" + (options.strokeSize || 1) + ";";
    }
    if (options.opacity) {
      optsData += "opacity:" + options.opacity + ";";
    }
    var n = options.x + options.w / 2;
    var o = options.y + options.h / 2;
    /** @type {string} */
    var key = "";
    if (options.rotate || options.initRotate) {
      var column = options.rotate || 0;
      column += options.initRotate || 0;
      /** @type {number} */
      var i = column * find;
      /** @type {string} */
      key = 'transform="rotate(' + i + " " + n + ", " + o + ')"';
    }
    /** @type {string} */
    var s = "";
    /** @type {string} */
    var inner = "";
    return options.shadow && (s += ' filter="url(#' + toString(options.shadow) + ')"'), void 0 !== options.dashed && (inner += ' stroke-dasharray="' + cache[options.dashed].join(",") + '"'), 'style="' + optsData + '" ' + key + s + inner;
  };
  /**
   * @param {Array} b
   * @param {Object} name
   * @return {?}
   */
  var flush = function(b, name) {
    var template;
    /** @type {string} */
    var output = "<defs>";
    /** @type {number} */
    var bi = 0;
    for (;bi < b.length;bi++) {
      var options = b[bi];
      var color = options.fillStyle;
      if (options.shadow) {
        var str = options.shadow;
        template = toString(str);
        if (!name[template]) {
          output += i(str, template);
          /** @type {boolean} */
          name[template] = true;
        }
      }
      if ("object" == typeof color && (color.gd || color.gdt)) {
        var value = parseInt(color);
        template = format(value[0], value[1]);
        if (!name[template]) {
          output += replace(color.gdt, value, template);
          /** @type {boolean} */
          name[template] = true;
        }
      }
    }
    return output += "</defs>";
  };
  /**
   * @param {(Array|Int8Array|Uint8Array)} s
   * @param {string} obj
   * @return {?}
   */
  var i = function(s, obj) {
    /** @type {number} */
    var c = 0;
    var k = s[c++];
    var tmp = s[c++];
    var v = s[c++];
    return'<filter id="' + obj + '"><feGaussianBlur in="SourceAlpha" stdDeviation="' + k + '" /><feOffset dx="' + tmp + '" dy="' + v + '" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>';
  };
  /**
   * @param {Array} val
   * @return {?}
   */
  var toString = function(val) {
    return "sd" + val.join("_");
  };
  /**
   * @param {?} res
   * @param {Array} values
   * @param {string} name
   * @return {?}
   */
  var replace = function(res, values, name) {
    return res ? done(values[0], values[1], name) : newElement(values[0], values[1], name);
  };
  /**
   * @param {Array} args
   * @return {?}
   */
  var each = function(args) {
    /** @type {string} */
    var obj = "";
    /** @type {number} */
    var idx = 0;
    for (;idx < args.length;) {
      var next = args[idx];
      var pageY = args[idx + 1];
      idx += 2;
      obj += '<stop offset="' + next + '%" stop-color="' + pageY + '" />';
    }
    return obj;
  };
  /**
   * @param {Array} obj
   * @param {Array} d
   * @return {?}
   */
  var format = function(obj, d) {
    return("gd" + obj.join("_") + d.join("_")).replace(/\#/gi, "");
  };
  /**
   * @param {Array} html
   * @param {Array} vars
   * @param {string} props
   * @return {?}
   */
  var newElement = function(html, vars, props) {
    props = props || format(html, vars);
    /** @type {number} */
    var h = 0;
    /** @type {string} */
    var newElement = '<linearGradient id="' + props + '" x1="' + html[h++] + '%" y1="' + html[h++] + '%" x2="' + html[h++] + '%" y2="' + html[h++] + '%">' + each(vars) + "</linearGradient>";
    return newElement;
  };
  /**
   * @param {Array} data
   * @param {Array} item
   * @param {string} msg
   * @return {?}
   */
  var done = function(data, item, msg) {
    msg = msg || format(data, item);
    /** @type {number} */
    var j = 0;
    /** @type {string} */
    var _done = '<radialGradient id="' + msg + '" gradientUnits="objectBoundingBox" cx="' + data[j++] + '%" cy="' + data[j++] + '%" r="' + data[j++] + '%"' + (data.length > 3 ? ' fx="' + data[j++] + '%" fy="' + data[j++] + '%"' : "") + ">" + each(item) + "</radialGradient>";
    return _done;
  };
  /**
   * @param {Array} value
   * @param {Object} object
   * @param {number} data
   * @return {undefined}
   */
  var serialize = function(value, object, data) {
    value[value.length] = write(object, $.defaultTextOpt(object), data);
  };
  /**
   * @param {Object} c
   * @param {Object} options
   * @param {number} node
   * @return {?}
   */
  var write = function(c, options, node) {
    /** @type {string} */
    var out = '<text text-anchor="';
    var e = c.x + options.dx;
    var k = c.y + options.dy;
    switch(options.align) {
      case "left":
        out += "start";
        break;
      case "right":
        out += "end";
        break;
      default:
        out += "middle";
    }
    switch(out += '" dominant-baseline="', options.baseline) {
      case "top":
        out += "hanging";
        break;
      case "bottom":
        out += "text-after-edge";
        break;
      default:
        out += "middle";
    }
    out += '" x="' + e + '" y="' + k;
    var cell = push(c, options, node);
    return out += '">' + cell + "</text>";
  };
  /**
   * @param {Object} c
   * @param {Object} args
   * @param {number} dataAndEvents
   * @return {?}
   */
  var push = function(c, args, dataAndEvents) {
    /** @type {string} */
    var ret = "";
    var resultItems = args.text;
    var f = c.x + args.dx;
    var g = c.y + args.dy;
    /** @type {number} */
    var i = 0;
    for (;resultItems && i < resultItems.length;i++) {
      var result = resultItems[i];
      ret += '<tspan x="' + f + '" y="' + g + '" dy="' + i * dataAndEvents[1] + '">' + result + "</tspan>";
    }
    return ret;
  };
  /**
   * @param {Array} arr
   * @param {Object} func
   * @param {(Array|RegExp|string)} ast
   * @return {undefined}
   */
  var wrap = function(arr, func, ast) {
    /** @type {string} */
    arr[arr.length] = '<path d="' + ast.join(" ") + '" ' + set(func) + " />";
  };
  /**
   * @param {Object} object
   * @param {Array} o
   * @param {Array} _
   * @param {number} data
   * @param {number} value
   * @return {?}
   */
  var callback = function(object, o, _, data, value) {
    /** @type {Array} */
    var ret = [];
    return wrap(ret, $.extend({
      style : 3,
      fillStyle : object.strokeStyle || "#000",
      strokeStyle : object.strokeStyle || "#000"
    }, object), $.arrowHeaderPath(o, _, data, value)), ret.join("");
  };
  /**
   * @param {Array} bytes
   * @param {Object} me
   * @return {undefined}
   */
  var update = function(bytes, me) {
    var pdataCur = me.hz || 12;
    /** @type {Array} */
    var context = [me.x, me.y];
    /** @type {Array} */
    var index = [me.x + me.w, me.y + me.h];
    /** @type {null} */
    var event = null;
    /** @type {number} */
    var pdataOld = 0;
    /** @type {number} */
    var udataCur = 0;
    if (!(null == me.header)) {
      if (!isNaN(me.header)) {
        /** @type {number} */
        pdataOld = 15 & me.header;
        /** @type {number} */
        udataCur = (240 & me.header) >> 4;
      }
    }
    /** @type {Array} */
    var result = context;
    /** @type {string} */
    var buffer = "";
    if ($.isArray(me.ex) && me.ex.length > 0) {
      if (me.ex.length > 0) {
        /** @type {number} */
        var ename = 0;
        if (pdataOld) {
          /** @type {number} */
          ename = me.ex.length - 1;
          event = me.ex[ename];
          /** @type {Array} */
          result = [event.dx + me.x, event.dy + me.y];
          buffer += callback(me, result, index, pdataCur, pdataOld);
        }
        if (udataCur) {
          /** @type {number} */
          ename = 0;
          event = me.ex[ename];
          /** @type {Array} */
          result = [event.dx + me.x, event.dy + me.y];
          buffer += callback(me, result, context, pdataCur, udataCur);
        }
      }
    } else {
      if (me.ex && !$.isArray(me.ex)) {
        /** @type {Array} */
        result = [me.ex.dx + me.x, me.ex.dy + me.y];
        if (pdataOld) {
          buffer += callback(me, result, index, pdataCur, pdataOld);
        }
        if (udataCur) {
          buffer += callback(me, result, context, pdataCur, udataCur);
        }
      } else {
        if (pdataOld) {
          buffer += callback(me, context, index, pdataCur, pdataOld);
        }
        if (udataCur) {
          buffer += callback(me, index, context, pdataCur, udataCur);
        }
      }
    }
    /** @type {string} */
    bytes[bytes.length] = buffer;
  };
  /**
   * @param {?} context
   * @return {undefined}
   */
  var renderer = function(context) {
    this._ctx = context;
    /** @type {Array} */
    this._tag = [];
  };
  renderer.prototype = {
    /**
     * @param {?} obj
     * @param {?} label
     * @return {undefined}
     */
    renderer : function(obj, label) {
      $.renderer(this, obj, label);
    },
    /**
     * @param {Object} obj
     * @param {number} callback
     * @return {undefined}
     */
    _buildText : function(obj, callback) {
      serialize(this._tag, obj, callback);
    },
    /**
     * @param {Object} o
     * @return {undefined}
     */
    _buildHeader : function(o) {
      update(this._tag, o);
    },
    /**
     * @param {Object} method
     * @param {string} key
     * @return {undefined}
     */
    _buildPath : function(method, key) {
      wrap(this._tag, method, key);
    },
    /**
     * @return {?}
     */
    toString : function() {
      return this._tag.join("");
    }
  };
  /**
   * @param {?} ctx
   * @return {undefined}
   */
  var Map = function(ctx) {
    this._ctx = ctx;
  };
  return Map.prototype = {
    /**
     * @param {?} obj
     * @param {?} label
     * @return {undefined}
     */
    renderer : function(obj, label) {
      $.renderer(this, obj, label);
    },
    /**
     * @param {Object} obj
     * @param {number} callback
     * @return {undefined}
     */
    _buildText : function(obj, callback) {
      serialize(this._ctx, obj, callback);
    },
    /**
     * @param {Object} o
     * @return {undefined}
     */
    _buildHeader : function(o) {
      update(this._ctx, o);
    },
    /**
     * @param {Object} method
     * @param {string} key
     * @return {undefined}
     */
    _buildPath : function(method, key) {
      wrap(this._ctx, method, key);
    },
    /**
     * @return {undefined}
     */
    save : function() {
    },
    /**
     * @return {undefined}
     */
    restore : function() {
    },
    /**
     * @return {undefined}
     */
    clear : function() {
    },
    /**
     * @return {undefined}
     */
    scale : function() {
    },
    /**
     * @param {Object} options
     * @param {?} text
     * @return {?}
     */
    parse : function(options, text) {
      /** @type {string} */
      var c = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="svg1" width="' + options.w + '" height="' + options.h + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
      c += flush(options.d, this);
      var data = new renderer(this);
      return data.renderer(options.d, text), c += data.toString(), c += "</svg>";
    }
  }, {
    /**
     * @param {string} properties
     * @return {?}
     */
    create : function(properties) {
      return new Map(properties);
    }
  };
});

!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d));
    }
  }
}(this, function(elem) {
  var options = elem.util;
  var f = options.describeArc;
  var func = options.describeArcL;
  var fire = options.calcExArc;
  /**
   * @param {Object} self
   * @return {?}
   */
  var set = function(self) {
    var inEvent = self.ex = self.ex || {
      dx : 3 * self.w / 4,
      dy : -10
    };
    var x = inEvent.dx;
    var d = self.y + self.h / 2;
    /** @type {Array} */
    var rightArrow = ["M", self.x, self.y, "L", self.x + x, self.y, "L", self.x + self.w, d, "L", self.x + x, self.y + self.h, "L", self.x, self.y + self.h, "Z"];
    return rightArrow;
  };
  /**
   * @param {Object} node
   * @return {?}
   */
  var _attach_data = function(node) {
    var inEvent = node.ex = node.ex || {
      dx : 3 * node.w / 4,
      dy : -10
    };
    var d = inEvent.dx;
    var I = node.y + node.h / 2;
    /** @type {Array} */
    var arr = ["M", node.x, node.y, "L", node.x + d, node.y, "L", node.x + node.w, I, "L", node.x + d, node.y + node.h, "L", node.x, node.y + node.h, "L", node.x + node.w - d, I, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var search = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w - self.w / 5,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var tileSize = self.y + self.h / 2;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x + x, self.y, "L", self.x + self.w, tileSize, "L", self.x + x, self.y + self.h, "L", self.x + x, 2 * tileSize - self.y - y, "L", self.x, 2 * tileSize - self.y - y, "L", self.x + (self.w - x) * (1 - 2 * y / self.h), tileSize, "L", self.x, self.y + y, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @param {number} last
   * @return {?}
   */
  var process = function(self, last) {
    var events = self.ex = self.ex || [{
      dx : 3 * self.w / 8,
      dy : self.h / 8
    }, {
      dx : 1 * self.w / 4,
      dy : -10
    }];
    var d = events[0].dx;
    var y = events[0].dy;
    var x = events[1].dx;
    var offsetLeft = self.x + self.w / 2;
    var CSHARP_KEYWORDS = self.y + self.h / 2;
    if (3 === last) {
      CSHARP_KEYWORDS += x / self.w * self.h;
    }
    /** @type {Array} */
    var origin = [self.x + d, CSHARP_KEYWORDS - self.h * (offsetLeft - (self.x + d)) / self.w];
    /** @type {Array} */
    var j = [self.x + d, self.y + y];
    /** @type {Array} */
    var k = [self.x + x, j[1]];
    /** @type {Array} */
    var start = [offsetLeft, self.y];
    /** @type {Array} */
    var m = [2 * offsetLeft - k[0], k[1]];
    /** @type {Array} */
    var n = [2 * offsetLeft - j[0], j[1]];
    /** @type {Array} */
    var o = [2 * offsetLeft - origin[0], origin[1]];
    /** @type {Array} */
    var p = [self.x + self.w - y / self.h * self.w, origin[1]];
    /** @type {Array} */
    var q = [p[0], CSHARP_KEYWORDS - (self.w / 2 - x) / self.w * self.h];
    /** @type {Array} */
    var ALL_KEYWORDS = [self.x + self.w, CSHARP_KEYWORDS];
    /** @type {Array} */
    var s = [q[0], 2 * CSHARP_KEYWORDS - q[1]];
    /** @type {Array} */
    var t = [p[0], 2 * CSHARP_KEYWORDS - p[1]];
    /** @type {Array} */
    var arr = ["M", origin[0], origin[1], "L", j[0], j[1], "L", k[0], k[1], "L", start[0], start[1], "L", m[0], m[1], "L", n[0], n[1], "L", o[0], o[1], "L", p[0], p[1], "L", q[0], q[1], "L", ALL_KEYWORDS[0], ALL_KEYWORDS[1], "L", s[0], s[1], "L", t[0], t[1], "L", o[0], 2 * CSHARP_KEYWORDS - o[1]];
    /** @type {Array} */
    var files = ["L", n[0], 2 * CSHARP_KEYWORDS - n[1], "L", m[0], 2 * CSHARP_KEYWORDS - m[1], "L", start[0], 2 * CSHARP_KEYWORDS - start[1], "L", k[0], 2 * CSHARP_KEYWORDS - k[1], "L", j[0], 2 * CSHARP_KEYWORDS - j[1]];
    /** @type {Array} */
    var key = ["L", origin[0], 2 * CSHARP_KEYWORDS - origin[1], "L", 2 * offsetLeft - t[0], t[1], "L", 2 * offsetLeft - s[0], s[1], "L", 2 * offsetLeft - ALL_KEYWORDS[0], ALL_KEYWORDS[1], "L", 2 * offsetLeft - q[0], q[1], "L", 2 * offsetLeft - p[0], p[1], "Z"];
    return 3 !== last && (arr = arr.concat(files)), arr = arr.concat(key);
  };
  /**
   * @param {Object} item
   * @return {?}
   */
  var matches = function(item) {
    return process(item, 3);
  };
  /**
   * @param {Object} size
   * @param {(number|string)} dataAndEvents
   * @return {?}
   */
  var init = function(size, dataAndEvents) {
    var events = size.ex = size.ex || [{
      dx : size.w / 2,
      dy : size.h / 4
    }, {
      dx : 3 * size.w / 8,
      dy : -10
    }];
    var x = events[0].dx;
    var dy = events[0].dy;
    var dx = events[1].dx;
    var column = size.x + (size.w - dx) / 2 + dx;
    /** @type {Array} */
    var h = [size.x + x, size.y + dy];
    /** @type {Array} */
    var i = [size.x + dx, h[1]];
    /** @type {Array} */
    var allowedGraphTypes = [column, size.y];
    /** @type {Array} */
    var k = [2 * column - i[0], i[1]];
    /** @type {Array} */
    var l = [2 * column - h[0], h[1]];
    /** @type {number} */
    var offset = dx / size.w * size.h;
    var CSHARP_KEYWORDS = size.y + offset + (size.h - offset) / 2;
    /** @type {number} */
    var px = dy / size.h * size.w;
    /** @type {number} */
    var r2Y = x / size.w * size.h;
    /** @type {Array} */
    var q = [size.x + px, size.y + r2Y];
    /** @type {Array} */
    var r = [q[0], size.y + offset];
    /** @type {Array} */
    var ALL_KEYWORDS = [size.x, CSHARP_KEYWORDS];
    /** @type {Array} */
    var t = [r[0], 2 * CSHARP_KEYWORDS - r[1]];
    /** @type {Array} */
    var b = [q[0], 2 * CSHARP_KEYWORDS - q[1]];
    /** @type {Array} */
    var a = [l[0], 1 === dataAndEvents ? size.y + size.h : b[1]];
    /** @type {Array} */
    var w = [h[0], 1 === dataAndEvents ? q[1] + (a[1] - b[1]) : q[1]];
    if (1 === dataAndEvents) {
      /** @type {Array} */
      b = [size.x, a[1]];
      /** @type {Array} */
      q = [size.x, w[1]];
    }
    /** @type {Array} */
    var path = ["M", h[0], h[1], "L", i[0], i[1], "L", allowedGraphTypes[0], allowedGraphTypes[1], "L", k[0], k[1], "L", l[0], l[1], "L", a[0], a[1], "L", b[0], b[1]];
    return 1 !== dataAndEvents && (path = path.concat(["L", t[0], t[1], "L", ALL_KEYWORDS[0], ALL_KEYWORDS[1], "L", r[0], r[1]])), path = path.concat(["L", q[0], q[1], "L", w[0], w[1], "Z"]);
  };
  /**
   * @param {Object} cb
   * @return {?}
   */
  var preload = function(cb) {
    return init(cb, 1);
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var bounds = function(self) {
    var point = self.ex = self.ex || {
      dx : 2 * self.w / 3,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var CSHARP_KEYWORDS = self.y + self.h / 2;
    /** @type {Array} */
    var b = [self.x + x, self.y + y];
    /** @type {Array} */
    var g = [b[0], self.y];
    /** @type {Array} */
    var h = [self.x + self.w, self.y + self.h / 3];
    /** @type {Array} */
    var i = [g[0], 2 * h[1] - g[1]];
    /** @type {Array} */
    var a = [b[0], 2 * h[1] - b[1]];
    /** @type {number} */
    var distance = a[1] - b[1];
    /** @type {Array} */
    var l = [self.x + distance, i[1]];
    /** @type {Array} */
    var m = [l[0], a[1]];
    /** @type {Array} */
    var n = [l[0], self.y + self.h];
    /** @type {Array} */
    var o = [self.x, n[1]];
    /** @type {Array} */
    var ALL_KEYWORDS = [self.x, CSHARP_KEYWORDS];
    /** @type {Array} */
    var q = [self.x, b[1]];
    /** @type {Array} */
    var arr = ["M", g[0], g[1], "L", h[0], h[1], "L", i[0], i[1], "L", a[0], a[1], "Q", m[0], m[1], l[0], l[1], "L", n[0], n[1], "L", o[0], o[1], "L", ALL_KEYWORDS[0], ALL_KEYWORDS[1], "Q", q[0], q[1], b[0], b[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} box
   * @return {?}
   */
  var remove = function(box) {
    /** @type {Array} */
    var b = [box.x + 3 * box.w / 4, box.y + 2 * box.h / 3];
    /** @type {Array} */
    var c = [box.x + box.w, box.y + 3 * box.h / 8];
    /** @type {Array} */
    var xy = [box.x + 7 * box.w / 8, c[1]];
    /** @type {Array} */
    var e = [box.x + (xy[0] - box.x) / 2, box.y];
    /** @type {Array} */
    var f = [xy[0], box.y];
    /** @type {Array} */
    var g = [box.x, box.y];
    /** @type {Array} */
    var h = [box.x, xy[1]];
    /** @type {Array} */
    var i = [box.x, box.y + box.h];
    /** @type {Array} */
    var j = [2 * b[0] - c[0], c[1]];
    /** @type {Array} */
    var k = [2 * b[0] - xy[0], xy[1]];
    /** @type {Array} */
    var l = [e[0], box.y + box.h / 4];
    /** @type {Array} */
    var m = [2 * l[0] - k[0], k[1]];
    /** @type {Array} */
    var n = [m[0], i[1]];
    /** @type {Array} */
    var o = [m[0], l[1]];
    /** @type {Array} */
    var p = [k[0], l[1]];
    /** @type {Array} */
    var rightArrow = ["M", b[0], b[1], "L", c[0], c[1], "L", xy[0], xy[1], "Q", f[0], f[1], e[0], e[1], "Q", g[0], g[1], h[0], h[1], "L", i[0], i[1], "L", n[0], n[1], "L", m[0], m[1], "Q", o[0], o[1], l[0], l[1], "Q", p[0], p[1], k[0], k[1], "L", j[0], j[1], "Z"];
    return rightArrow;
  };
  /**
   * @param {Object} pos
   * @return {?}
   */
  var center = function(pos) {
    var events = pos.ex = pos.ex || [{
      dx : 2 * pos.w / 3,
      dy : -10
    }, {
      dx : 5 * pos.w / 6,
      dy : 3 * pos.h / 8
    }, {
      dx : pos.w + 10,
      dy : pos.h / 4
    }];
    var dx = events[0].dx;
    var x = events[1].dx;
    var dy = events[1].dy;
    var y = events[2].dy;
    /** @type {Array} */
    var g = [pos.x + dx, pos.y];
    /** @type {Array} */
    var h = [g[0], pos.y + dy];
    /** @type {Array} */
    var i = [pos.x + x, pos.y + dy];
    /** @type {Array} */
    var j = [i[0], pos.y + y];
    /** @type {Array} */
    var k = [pos.x + pos.w, pos.y + pos.h / 2];
    /** @type {Array} */
    var l = [j[0], 2 * k[1] - j[1]];
    /** @type {Array} */
    var m = [i[0], 2 * k[1] - i[1]];
    /** @type {Array} */
    var n = [h[0], 2 * k[1] - h[1]];
    /** @type {Array} */
    var o = [n[0], pos.y + pos.h];
    /** @type {Array} */
    var p = [pos.x, pos.y + pos.h];
    /** @type {Array} */
    var q = [pos.x, pos.y];
    /** @type {Array} */
    var arr = ["M", g[0], g[1], "L", h[0], h[1], "L", i[0], i[1], "L", j[0], j[1], "L", k[0], k[1], "L", l[0], l[1], "L", m[0], m[1], "L", n[0], n[1], "L", o[0], o[1], "L", p[0], p[1], "L", q[0], q[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} node
   * @return {?}
   */
  var drawCircle = function(node) {
    return node.initRotate = node.initRotate || Math.PI, center(node);
  };
  /**
   * @param {Object} params
   * @return {?}
   */
  var update = function(params) {
    var position = params.x;
    var offset = params.y;
    var length = params.w;
    var height = params.h;
    var events = params.ex = params.ex || [{
      dy : 2 * height / 3,
      dx : -10
    }, {
      dy : 5 * height / 6,
      dx : 3 * length / 8
    }, {
      dy : height + 10,
      dx : length / 4
    }];
    var bytesRead = events[0].dy;
    var dy = events[1].dy;
    var count = events[1].dx;
    var dx = events[2].dx;
    /** @type {Array} */
    var props1 = [position, offset + bytesRead];
    /** @type {Array} */
    var l = [position + count, props1[1]];
    /** @type {Array} */
    var m = [position + count, offset + dy];
    /** @type {Array} */
    var n = [position + dx, m[1]];
    /** @type {Array} */
    var o = [position + length / 2, offset + height];
    /** @type {Array} */
    var p = [2 * o[0] - n[0], n[1]];
    /** @type {Array} */
    var q = [2 * o[0] - m[0], m[1]];
    /** @type {Array} */
    var r = [2 * o[0] - l[0], l[1]];
    /** @type {Array} */
    var s = [position + length, r[1]];
    /** @type {Array} */
    var offsets = [position + length, offset];
    /** @type {Array} */
    var repositioners = [position, offset];
    /** @type {Array} */
    var arr = ["M", props1[0], props1[1], "L", l[0], l[1], "L", m[0], m[1], "L", n[0], n[1], "L", o[0], o[1], "L", p[0], p[1], "L", q[0], q[1], "L", r[0], r[1], "L", s[0], s[1], "L", offsets[0], offsets[1], "L", repositioners[0], repositioners[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} param
   * @return {?}
   */
  var initialize = function(param) {
    return param.initRotate = param.initRotate || Math.PI, update(param);
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var reset = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 5,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var tileSize = self.y + self.h / 2;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x + x, self.y, "L", self.x, tileSize, "L", self.x + x, self.y + self.h, "L", self.x + x, 2 * tileSize - self.y - y, "L", self.x + self.w, 2 * tileSize - self.y - y, "L", self.x + self.w, self.y + y, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var interpolatedEvents = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w - self.w / 5,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var tileSize = self.y + self.h / 2;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x + x, self.y, "L", self.x + self.w, tileSize, "L", self.x + x, self.y + self.h, "L", self.x + x, 2 * tileSize - self.y - y, "L", self.x, 2 * tileSize - self.y - y, "L", self.x, self.y + y, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var processPath = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 5,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var scaleValue = self.x + self.w / 2;
    var tileSize = self.y + self.h / 2;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x + x, self.y, "L", self.x, tileSize, "L", self.x + x, self.y + self.h, "L", self.x + x, 2 * tileSize - self.y - y, "L", 2 * scaleValue - self.x - x, 2 * tileSize - self.y - y, "L", 2 * scaleValue - self.x - x, self.y + self.h, "L", self.x + self.w, tileSize, "L", 2 * scaleValue - self.x - x, self.y, "L", 2 * scaleValue - self.x - x, self.y + y, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var tick = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 5,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var tileSize = self.x + self.w / 2;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x, self.y + y, "L", tileSize, self.y, "L", self.x + self.w, self.y + y, "L", 2 * tileSize - self.x - x, self.y + y, "L", 2 * tileSize - self.x - x, self.y + self.h, "L", self.x + x, self.y + self.h, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var fn = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 5,
      dy : self.h - self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var tileSize = self.x + self.w / 2;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x, self.y + y, "L", tileSize, self.y + self.h, "L", self.x + self.w, self.y + y, "L", 2 * tileSize - self.x - x, self.y + y, "L", 2 * tileSize - self.x - x, self.y, "L", self.x + x, self.y, "Z"];
    return arr;
  };
  /**
   * @param {Object} rect
   * @return {?}
   */
  var collideRect = function(rect) {
    var matrix = rect.ex = rect.ex || {
      dx : rect.w / 5,
      dy : rect.h / 5
    };
    var dx = matrix.dx;
    var dy = matrix.dy;
    var x = rect.x + rect.w / 2;
    var tileSize = rect.y + rect.h / 2;
    /** @type {Array} */
    var arr = ["M", rect.x + dx, rect.y + dy, "L", rect.x, rect.y + dy, "L", x, rect.y, "L", rect.x + rect.w, rect.y + dy, "L", 2 * x - rect.x - dx, rect.y + dy, "L", 2 * x - rect.x - dx, 2 * tileSize - rect.y - dy, "L", rect.x + rect.w, 2 * tileSize - rect.y - dy, "L", x, rect.y + rect.h, "L", rect.x, 2 * tileSize - rect.y - dy, "L", rect.x + dx, 2 * tileSize - rect.y - dy, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var get = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w - self.w / 5,
      dy : self.h / 5
    };
    var x = point.dx;
    var y = point.dy;
    var tileSize = self.y + self.h / 2;
    /** @type {number} */
    var distance = self.w / 8;
    /** @type {number} */
    var i = distance / 5;
    /** @type {Array} */
    var arr = ["M", self.x + x, self.y + y, "L", self.x + x, self.y, "L", self.x + self.w, tileSize, "L", self.x + x, self.y + self.h, "L", self.x + x, 2 * tileSize - self.y - y, "L", self.x + distance, 2 * tileSize - self.y - y, "L", self.x + distance, self.y + y, "Z", "M", self.x, self.y + y, "L", self.x + i, self.y + y, "L", self.x + i, 2 * tileSize - self.y - y, "L", self.x, 2 * tileSize - self.y - y, "Z", "M", self.x + 2 * i, self.y + y, "L", self.x + 4 * i, self.y + y, "L", self.x + 4 * i, 
    2 * tileSize - self.y - y, "L", self.x + 2 * i, 2 * tileSize - self.y - y, "Z"];
    return arr;
  };
  /**
   * @param {Object} rect
   * @param {boolean} in_recursion
   * @return {?}
   */
  var render = function(rect, in_recursion) {
    var events = rect.ex = rect.ex || [{
      dx : rect.w / 2,
      dy : 0
    }, {
      dx : rect.w,
      dy : rect.h / 3
    }, {
      dx : 5 * rect.w / 6,
      dy : rect.h / 3
    }];
    /** @type {number} */
    var s = rect.w / 2;
    /** @type {number} */
    var item = Math.asin((events[1].dy - (in_recursion ? rect.h : 0)) / rect.h);
    /** @type {number} */
    var recurring = Math.PI / 2 * (in_recursion ? -1 : 1);
    /** @type {number} */
    var m = s * Math.cos(item);
    /** @type {number} */
    var delta = s + m - events[0].dx;
    /** @type {number} */
    var dx = rect.w - delta / 2;
    /** @type {number} */
    var value = dx / 2 * Math.cos(item);
    var tval = rect.x + dx / 2 + value;
    /** @type {number} */
    var restrictedX = 2 * tval - (rect.x + events[2].dx);
    /** @type {number} */
    var i = (restrictedX - rect.x) / (1 + Math.cos(item));
    var x = rect.x + i;
    var name = rect.y + (in_recursion ? rect.h : 0);
    /** @type {number} */
    var val = rect.x + events[2].dx - i * Math.cos(item);
    var path = f(x, name, i, rect.h, Math.acos((val - x) / 2 / i) * (in_recursion ? -1 : 1), item, !!in_recursion, 0);
    path = path.concat(["L", rect.x + events[0].dx, rect.y + events[1].dy, "L", rect.x + dx, name, "L", 2 * tval - rect.x - events[0].dx, rect.y + events[1].dy]);
    path = path.concat(func(val, name, i, rect.h, item, recurring, !in_recursion, 0));
    var result = f(val, name, i, rect.h, recurring, Math.PI, !in_recursion, 0);
    return result = result.concat(func(x, name, i, rect.h, Math.PI, recurring, !!in_recursion, 0)), result = result.concat("Z"), [path.concat(result), result];
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var run = function(args) {
    return args.ex = args.ex || [{
      dx : args.w / 2,
      dy : args.h
    }, {
      dx : args.w,
      dy : 2 * args.h / 3
    }, {
      dx : 5 * args.w / 6,
      dy : 2 * args.h / 3
    }], render(args, true);
  };
  /**
   * @param {Object} c
   * @param {boolean} shadow
   * @return {?}
   */
  var distance = function(c, shadow) {
    var events = c.ex = c.ex || [{
      dy : c.h / 2,
      dx : 0
    }, {
      dy : c.h,
      dx : c.w / 3
    }, {
      dy : 5 * c.h / 6,
      dx : c.w / 3
    }];
    /** @type {number} */
    var a = c.h / 2;
    /** @type {number} */
    var item = Math.acos((events[1].dx - (shadow ? c.w : 0)) / c.w);
    /** @type {number} */
    var recurring = shadow ? Math.PI : 0;
    /** @type {number} */
    var b = a * Math.sin(item);
    /** @type {number} */
    var y = a + b - events[0].dy;
    /** @type {number} */
    var topDelta = c.h - y / 2;
    /** @type {number} */
    var value = topDelta / 2 * Math.sin(item);
    var tval = c.y + topDelta / 2 + value;
    /** @type {number} */
    var targetY = 2 * tval - (c.y + events[2].dy);
    /** @type {number} */
    var s = (targetY - c.y) / (1 + Math.sin(item));
    var n = c.y + s;
    var x = c.x + (shadow ? c.w : 0);
    /** @type {number} */
    var i = c.y + events[2].dy - s * Math.sin(item);
    var results = f(x, n, c.w, s, Math.asin((i - n) / 2 / s) + recurring, item, !shadow, 0);
    results = results.concat(["L", c.x + events[1].dx, c.y + events[0].dy, "L", x, c.y + topDelta, "L", c.x + events[1].dx, 2 * tval - c.y - events[0].dy]);
    results = results.concat(func(x, i, c.w, s, item, recurring, !!shadow, 0));
    var result = f(x, i, c.w, s, recurring, -Math.PI / 2, !!shadow, 0);
    return result = result.concat(func(x, n, c.w, s, -Math.PI / 2, recurring, !shadow, 0)), result = result.concat("Z"), [results.concat(result), result];
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var draw = function(args) {
    return args.ex = args.ex || [{
      dy : args.h / 2,
      dx : args.w
    }, {
      dy : args.h,
      dx : 2 * args.w / 3
    }, {
      dy : 5 * args.h / 6,
      dx : 2 * args.w / 3
    }], distance(args, true);
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var move = function(args) {
    var events = args.ex = args.ex || [{
      dx : 0,
      dy : args.h / 2
    }, {
      dx : args.w / 4,
      dy : 2 * args.h / 3
    }];
    /** @type {number} */
    var l = args.w / 2;
    /** @type {number} */
    var height = args.h / 2;
    var x = args.x + l;
    var i = args.y + height;
    var json = fire(args);
    var recurring = json[0];
    var item = json[1];
    /** @type {number} */
    var w = 0;
    /** @type {number} */
    var y = 0;
    if (events[1].dy - height === 0) {
      /** @type {number} */
      w = events[1].dx - l;
      /** @type {number} */
      y = args.h * (w / args.w);
    } else {
      if (events[1].dx - l === 0) {
        /** @type {number} */
        y = events[1].dy - height;
        /** @type {number} */
        w = args.w * (y / args.h);
      } else {
        /** @type {number} */
        w = (events[1].dx - l) / Math.cos(item);
        /** @type {number} */
        y = (events[1].dy - height) / Math.sin(item);
      }
    }
    /** @type {number} */
    var isDefault = Math.abs(item - recurring) > Math.PI ? 1 : 0;
    /** @type {number} */
    var r = (l + w) / 2;
    /** @type {number} */
    var width = (height + y) / 2;
    var theta = item + Math.PI / 6;
    var file = x + r * Math.cos(theta);
    var j = i + width * Math.sin(theta);
    var xm = x + (r + args.w / 5) * Math.cos(item);
    var next = i + (width + args.h / 5) * Math.sin(item);
    var v = x + (r - args.w / 5) * Math.cos(item);
    var _iterate = i + (width - args.h / 5) * Math.sin(item);
    var ret = f(x, i, l, height, recurring, item, true, isDefault);
    return ret = ret.concat(["L", xm, next]), ret = ret.concat(["L", file, j]), ret = ret.concat(["L", v, _iterate]), w = Math.abs(w), y = Math.abs(y), ret = ret.concat(func(x, i, w, y, item, recurring, false, isDefault)), ret = ret.concat("Z");
  };
  return{
    /** @type {function (Object): ?} */
    larrow : reset,
    /** @type {function (Object): ?} */
    rarrow : interpolatedEvents,
    /** @type {function (Object): ?} */
    lrarrow : processPath,
    /** @type {function (Object): ?} */
    uarrow : tick,
    /** @type {function (Object): ?} */
    darrow : fn,
    /** @type {function (Object): ?} */
    udarrow : collideRect,
    /** @type {function (Object): ?} */
    stripedrarrow : get,
    /** @type {function (Object): ?} */
    pentagon : set,
    /** @type {function (Object): ?} */
    forkedtail : _attach_data,
    /** @type {function (Object): ?} */
    forkedtailarrow : search,
    /** @type {function (Object, number): ?} */
    crossarrow : process,
    /** @type {function (Object): ?} */
    lruarrow : matches,
    /** @type {function (Object, (number|string)): ?} */
    luarrow : init,
    /** @type {function (Object): ?} */
    bentuparrow : preload,
    /** @type {function (Object): ?} */
    bentarrow : bounds,
    /** @type {function (Object): ?} */
    uturnarrow : remove,
    /** @type {function (Object): ?} */
    rarrowcallout : center,
    /** @type {function (Object): ?} */
    larrowcallout : drawCircle,
    /** @type {function (Object): ?} */
    darrowcallout : update,
    /** @type {function (Object): ?} */
    uarrowcallout : initialize,
    /** @type {function (Object, boolean): ?} */
    curveduarraow : render,
    /** @type {function (Object): ?} */
    curveddarraow : run,
    /** @type {function (Object, boolean): ?} */
    curvedlarraow : distance,
    /** @type {function (Object): ?} */
    curvedrarraow : draw,
    /** @type {function (Object): ?} */
    circulararrow : move
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d));
    }
  }
}(this, function(api) {
  var args = api.util;
  var callback = args.describeArc;
  var slice = args.describeArcL;
  var map = args.calcExArc;
  /** @type {number} */
  var step = 0.6;
  /** @type {number} */
  var t = 0.8;
  /**
   * @param {Object} me
   * @return {?}
   */
  var processPath = function(me) {
    var i = me.x;
    var width = me.y;
    var offset = me.w;
    var x = me.h;
    /** @type {Array} */
    var l = ["M", i, width + x * t, "C"];
    var r = pad(i, width, offset, x);
    return l.concat(r).concat([i + offset, width + x * step, "L", i + offset, width, "L", i, width, "Z"]);
  };
  /**
   * @param {number} num
   * @param {number} len
   * @param {number} arg2
   * @param {number} x
   * @return {?}
   */
  var pad = function(num, len, arg2, x) {
    return[num + arg2 / 4, len + x * (2 - t), num + arg2 / 2, len + x * step];
  };
  /**
   * @param {Object} c
   * @return {?}
   */
  var link = function(c) {
    var l = c.x;
    var p = c.y;
    var w = c.w;
    var cl = c.h;
    /** @type {number} */
    var offset = 0.8 * w;
    /** @type {number} */
    var dx = 0.8 * cl;
    var viewWidth = p + cl * t;
    var x = l;
    /** @type {Array} */
    var path = [];
    /** @type {number} */
    var prevY = 0;
    for (;prevY < 3;prevY++) {
      var y = l + prevY * w * 0.1;
      var width = p + cl * (0.2 - 0.1 * prevY);
      /** @type {Array} */
      path = path.concat(["M", y, viewWidth, "L", y, width, "L", y + offset, width, "L", y + offset, width + dx * step]);
      /** @type {Array} */
      var caseSensitive = [y + offset, width + dx * step];
      if (0 === prevY) {
        var r = pad(y, width, offset, dx);
        /** @type {Array} */
        path = path.concat(["M", x, viewWidth, "C"]).concat(r).concat(caseSensitive);
      } else {
        /** @type {Array} */
        path = path.concat(["L", x, width + dx * step]);
      }
      viewWidth = width;
      x = y + offset;
    }
    return path;
  };
  /**
   * @param {Object} p
   * @return {?}
   */
  var lerp = function(p) {
    /** @type {Array} */
    var beginswith = ["M", p.x + p.w / 6, p.y + p.h, "C", p.x, p.y + p.h, p.x, p.y + p.h / 2, p.x + p.w / 6, p.y + p.h / 2];
    /** @type {Array} */
    var caseSensitive = ["C", p.x + p.w / 6, p.y + p.h / 3, p.x + p.w / 4, p.y + 2 * p.h / 9];
    /** @type {Array} */
    var STRINGS = [p.x + p.w / 3, p.y + p.h / 4, "C", p.x + p.w / 3, p.y - p.h / 7, p.x + 3 * p.w / 4, p.y - p.h / 7];
    /** @type {Array} */
    var oldIEIgnorables = [p.x + p.w - p.w / 5, p.y + p.h / 3, "C", p.x + p.w, p.y + p.h / 3, p.x + p.w, p.y + p.h, p.x + p.w - p.w / 5, p.y + p.h];
    /** @type {Array} */
    var dest = beginswith.concat(caseSensitive).concat(STRINGS).concat(oldIEIgnorables).concat("Z");
    return dest;
  };
  /**
   * @param {Object} o1
   * @return {?}
   */
  var merge = function(o1) {
    /** @type {Array} */
    var beginswith = ["M", o1.x, o1.y + o1.h / 4, "Q", o1.x, o1.y, o1.x + o1.w / 2, o1.y + o1.h / 6];
    /** @type {Array} */
    var caseSensitive = ["Q", o1.x + o1.w, o1.y, o1.x + o1.w, o1.y + o1.h / 4];
    /** @type {Array} */
    var STRINGS = ["Q", o1.x + o1.w, o1.y + o1.h / 2, o1.x + o1.w / 2, o1.y + o1.h];
    /** @type {Array} */
    var first = beginswith.concat(caseSensitive).concat(STRINGS).concat(["Q", o1.x, o1.y + o1.h / 2, o1.x, o1.y + o1.h / 4, "Z"]);
    return first;
  };
  /**
   * @param {Object} haystack
   * @param {number} opt_attributes
   * @param {number} view
   * @return {?}
   */
  var render = function(haystack, opt_attributes, view) {
    var codeSegments = args.polygon(haystack, opt_attributes, view);
    /** @type {Array} */
    var path = ["M", codeSegments[0][0], codeSegments[0][1]];
    /** @type {number} */
    var i = 1;
    for (;i < codeSegments.length;i++) {
      /** @type {Array} */
      path = path.concat(["L", codeSegments[i][0], codeSegments[i][1]]);
    }
    return path.concat("Z");
  };
  /**
   * @param {Object} rect
   * @return {?}
   */
  var collideRect = function(rect) {
    var options = rect.ex = rect.ex || {
      dx : rect.w / 2,
      dy : 0
    };
    /** @type {Array} */
    var c = [rect.x, rect.y + rect.h];
    /** @type {Array} */
    var d = [rect.x + rect.w, rect.y + rect.h];
    /** @type {Array} */
    var e = [rect.x + options.dx, rect.y + options.dy];
    /** @type {Array} */
    var rightArrow = ["M", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "Z"];
    return rightArrow;
  };
  /**
   * @param {Object} l
   * @return {?}
   */
  var setup = function(l) {
    /** @type {Array} */
    var b = [l.x + l.w / 2, l.y];
    /** @type {Array} */
    var c = [l.x + l.w, l.y + l.h / 2];
    /** @type {Array} */
    var d = [l.x + l.w / 2, l.y + l.h];
    /** @type {Array} */
    var e = [l.x, l.y + l.h / 2];
    /** @type {Array} */
    var arr = ["M", b[0], b[1], "L", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "Z"];
    return arr;
  };
  /**
   * @param {string} obj
   * @return {?}
   */
  var options = function(obj) {
    var config = obj.ex = obj.ex || {
      dx : obj.w / 4,
      dy : -10
    };
    /** @type {Array} */
    var c = [obj.x + config.dx, obj.y];
    /** @type {Array} */
    var d = [obj.x + obj.w, obj.y];
    /** @type {Array} */
    var e = [obj.x + obj.w - config.dx, obj.y + obj.h];
    /** @type {Array} */
    var f = [obj.x, obj.y + obj.h];
    /** @type {Array} */
    var arr = ["M", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "L", f[0], f[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} rect2
   * @return {?}
   */
  var bounds = function(rect2) {
    var options = rect2.ex = rect2.ex || {
      dx : rect2.w / 4,
      dy : rect2.h + 10
    };
    /** @type {Array} */
    var c = [rect2.x, rect2.y];
    /** @type {Array} */
    var d = [rect2.x + rect2.w, rect2.y];
    /** @type {Array} */
    var e = [rect2.x + rect2.w - options.dx, rect2.y + rect2.h];
    /** @type {Array} */
    var f = [rect2.x + options.dx, rect2.y + rect2.h];
    /** @type {Array} */
    var arr = ["M", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "L", f[0], f[1], "Z"];
    return void 0 === rect2.initRotate && (rect2.initRotate = Math.PI), arr;
  };
  /**
   * @param {Object} item
   * @return {?}
   */
  var push = function(item) {
    var px = item.ex.dx < item.w / 2 ? item.w : 0;
    var left = 0 === px ? item.w : 0;
    /** @type {Array} */
    var d = [item.x + px, item.y];
    /** @type {Array} */
    var e = [item.x + left, item.y];
    /** @type {Array} */
    var f = [item.x + left, item.y + item.ex.dy];
    /** @type {Array} */
    var g = [item.x + left, item.y + item.h - item.ex.dy];
    /** @type {Array} */
    var h = [item.x + left, item.y + item.h];
    /** @type {Array} */
    var i = [item.x + px, item.y + item.h];
    /** @type {Array} */
    var arr = ["M", d[0], d[1], "Q", e[0], e[1], f[0], f[1], "L", g[0], g[1], "Q", h[0], h[1], i[0], i[1]];
    return item.style = 2, arr;
  };
  /**
   * @param {Object} t
   * @return {?}
   */
  var onTouchStart = function(t) {
    return t.ex = t.ex || {
      dx : -10,
      dy : t.h / 6
    }, push(t);
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var constructor = function(args) {
    return args.ex = args.ex || {
      dx : args.w + 10,
      dy : args.h / 6
    }, push(args);
  };
  /**
   * @param {Object} node
   * @return {?}
   */
  var center = function(node) {
    var p = node.ex = node.ex || {
      dx : node.w / 4,
      dy : node.h / 6
    };
    /** @type {Array} */
    var padding = [p.dx, node.w - p.dx];
    /** @type {Array} */
    var path = [];
    /** @type {number} */
    var root = 0;
    for (;root < 2;root++) {
      var xOffset = 0 === root ? 0 : node.w;
      /** @type {Array} */
      var g = [node.x + padding[root], node.y];
      /** @type {Array} */
      var h = [node.x + xOffset, node.y];
      /** @type {Array} */
      var i = [node.x + xOffset, node.y + p.dy];
      /** @type {Array} */
      var j = [node.x + xOffset, node.y + node.h - p.dy];
      /** @type {Array} */
      var k = [node.x + xOffset, node.y + node.h];
      /** @type {Array} */
      var l = [node.x + padding[root], node.y + node.h];
      /** @type {Array} */
      path = path.concat(["M", g[0], g[1], "Q", h[0], h[1], i[0], i[1], "L", j[0], j[1], "Q", k[0], k[1], l[0], l[1]]);
    }
    return node.style = 2, path;
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var moveHandler = function(e) {
    var x = e.ex[0].dx <= e.w / 2 ? e.w : 0;
    var button = e.ex;
    /** @type {number} */
    var delta = Math.min(button[0].dy, e.w / 2);
    var fifth = 0 === x ? e.w : 0;
    /** @type {Array} */
    var f = [e.x + x, e.y];
    /** @type {Array} */
    var g = [e.x + e.w / 2, e.y];
    /** @type {Array} */
    var h = [e.x + e.w / 2, e.y + delta];
    var y = e.y + button[1].dy;
    if (y < e.y + 2 * delta) {
      y = e.y + 2 * delta;
    }
    if (y > e.y + e.h - 2 * delta) {
      /** @type {number} */
      y = e.y + e.h - 2 * delta;
    }
    /** @type {Array} */
    var j = [e.x + e.w / 2, y - delta];
    /** @type {Array} */
    var dirs = [e.x + e.w / 2, y];
    /** @type {Array} */
    var arrPoint = [e.x + fifth, y];
    /** @type {Array} */
    var data = [e.x + e.w / 2, y];
    /** @type {Array} */
    var n = [e.x + e.w / 2, y + delta];
    /** @type {Array} */
    var o = [e.x + e.w / 2, e.y + e.h - delta];
    /** @type {Array} */
    var p = [e.x + e.w / 2, e.y + e.h];
    /** @type {Array} */
    var q = [e.x + x, e.y + e.h];
    /** @type {Array} */
    var arr = ["M", f[0], f[1], "Q", g[0], g[1], h[0], h[1], "L", j[0], j[1], "Q", dirs[0], dirs[1], arrPoint[0], arrPoint[1], "Q", data[0], data[1], n[0], n[1], "L", o[0], o[1], "Q", p[0], p[1], q[0], q[1]];
    return e.style = 2, arr;
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var play = function(e) {
    return e.ex = e.ex || [{
      dx : e.w / 2,
      dy : e.w / 4
    }, {
      dx : -10,
      dy : e.h / 2
    }], moveHandler(e);
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var setH = function(e) {
    return e.ex = e.ex || [{
      dx : e.w / 2 + 1,
      dy : e.w / 4
    }, {
      dx : e.w + 10,
      dy : e.h / 2
    }], moveHandler(e);
  };
  /**
   * @param {Object} obj
   * @return {?}
   */
  var move = function(obj) {
    var events = obj.ex = obj.ex || [{
      dx : obj.w / 4,
      dy : obj.w / 4
    }, {
      dx : -10,
      dy : obj.h / 2
    }];
    /** @type {Array} */
    var frames = [events[0].dx, obj.w - events[0].dx];
    /** @type {Array} */
    var path = [];
    /** @type {number} */
    var y = Math.min(events[0].dy, events[0].dx / 2);
    /** @type {number} */
    var index = 0;
    for (;index < 2;index++) {
      var x = 0 === index ? 0 : obj.w;
      /** @type {number} */
      var r2X = 0 === index ? frames[0] / 2 : obj.w - frames[0] / 2;
      /** @type {Array} */
      var i = [obj.x + frames[index], obj.y];
      /** @type {Array} */
      var j = [obj.x + r2X, obj.y];
      /** @type {Array} */
      var k = [obj.x + r2X, obj.y + y];
      var h = obj.y + events[1].dy;
      if (h < obj.y + 2 * y) {
        h = obj.y + 2 * y;
      }
      if (h > obj.y + obj.h - 2 * y) {
        /** @type {number} */
        h = obj.y + obj.h - 2 * y;
      }
      /** @type {Array} */
      var m = [obj.x + r2X, h - y];
      /** @type {Array} */
      var vertices = [obj.x + r2X, h];
      /** @type {Array} */
      var t3s = [obj.x + x, h];
      /** @type {Array} */
      var setters_order = [obj.x + r2X, h];
      /** @type {Array} */
      var q = [obj.x + r2X, h + y];
      /** @type {Array} */
      var r = [obj.x + r2X, obj.y + obj.h - y];
      /** @type {Array} */
      var s = [obj.x + r2X, obj.y + obj.h];
      /** @type {Array} */
      var t = [obj.x + frames[index], obj.y + obj.h];
      /** @type {Array} */
      path = path.concat(["M", i[0], i[1], "Q", j[0], j[1], k[0], k[1], "L", m[0], m[1], "Q", vertices[0], vertices[1], t3s[0], t3s[1], "Q", setters_order[0], setters_order[1], q[0], q[1], "L", r[0], r[1], "Q", s[0], s[1], t[0], t[1]]);
    }
    return obj.style = 2, path;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var search = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 4,
      dy : self.h / 4
    };
    var x = point.dx;
    var y = point.dy;
    var ts = self.x + self.w / 2;
    var f = self.y + self.h / 2;
    /** @type {Array} */
    var origin = [self.x + x, self.y + y];
    /** @type {Array} */
    var h = [self.x + x, self.y];
    /** @type {Array} */
    var i = [2 * ts - origin[0], self.y];
    /** @type {Array} */
    var j = [2 * ts - origin[0], self.y + y];
    /** @type {Array} */
    var k = [self.x + self.w, self.y + y];
    /** @type {Array} */
    var l = [self.x + self.w, 2 * f - k[1]];
    /** @type {Array} */
    var m = [2 * ts - origin[0], 2 * f - j[1]];
    /** @type {Array} */
    var n = [2 * ts - origin[0], self.y + self.h];
    /** @type {Array} */
    var o = [self.x + x, self.y + self.h];
    /** @type {Array} */
    var p = [self.x + x, 2 * f - origin[1]];
    /** @type {Array} */
    var q = [self.x, 2 * f - origin[1]];
    /** @type {Array} */
    var r = [self.x, self.y + y];
    /** @type {Array} */
    var arr = ["M", origin[0], origin[1], "L", h[0], h[1], "L", i[0], i[1], "L", j[0], j[1], "L", k[0], k[1], "L", l[0], l[1], "L", m[0], m[1], "L", n[0], n[1], "L", o[0], o[1], "L", p[0], p[1], "L", q[0], q[1], "L", r[0], r[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var parseCommand = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 4,
      dy : self.h / 4
    };
    var x = point.dx;
    var y = point.dy;
    var ts = self.x + self.w / 2;
    var f = self.y + self.h / 2;
    /** @type {Array} */
    var g = [self.x, self.y + y];
    /** @type {Array} */
    var h = [self.x + x, self.y + y];
    /** @type {Array} */
    var origin = [self.x + x, self.y];
    /** @type {Array} */
    var j = [2 * ts - origin[0], self.y];
    /** @type {Array} */
    var k = [2 * ts - h[0], self.y + y];
    /** @type {Array} */
    var l = [self.x + self.w, self.y + y];
    /** @type {Array} */
    var m = [self.x + self.w, 2 * f - l[1]];
    /** @type {Array} */
    var n = [k[0], 2 * f - k[1]];
    /** @type {Array} */
    var o = [j[0], self.y + self.h];
    /** @type {Array} */
    var p = [self.x + x, self.y + self.h];
    /** @type {Array} */
    var q = [self.x + x, 2 * f - h[1]];
    /** @type {Array} */
    var r = [self.x, 2 * f - g[1]];
    /** @type {Array} */
    var arr = ["M", g[0], g[1], "Q", h[0], h[1], origin[0], origin[1], "L", j[0], j[1], "Q", k[0], k[1], l[0], l[1], "L", m[0], m[1], "Q", n[0], n[1], o[0], o[1], "L", p[0], p[1], "Q", q[0], q[1], r[0], r[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} size
   * @return {?}
   */
  var chunk = function(size) {
    /** @type {number} */
    var node = size.w / 5;
    /** @type {number} */
    var dy = size.w / 10;
    /** @type {number} */
    var s = size.h / 20;
    /** @type {Array} */
    var wrap = [size.x + 2 * size.w / 5, size.y];
    /** @type {Array} */
    var p = [wrap[0] + node, size.y + size.h / 4];
    /** @type {Array} */
    var g = [p[0] - dy, p[1] + s];
    /** @type {Array} */
    var c = [p[0] + node, size.y + size.h / 2 + s];
    /** @type {Array} */
    var i = [c[0] - dy, c[1] + s];
    /** @type {Array} */
    var j = [size.x + size.w, size.y + size.h];
    /** @type {Array} */
    var v = [wrap[0], j[1] - size.h / 3];
    /** @type {Array} */
    var l = [g[0], v[1] - s];
    /** @type {Array} */
    var m = [size.x + size.w / 4, size.y + size.h / 2 - s];
    /** @type {Array} */
    var n = [wrap[0], m[1] - s];
    /** @type {Array} */
    var o = [size.x, size.y + size.h / 6];
    /** @type {Array} */
    var arr = ["M", wrap[0], wrap[1], "L", p[0], p[1], "L", g[0], g[1], "L", c[0], c[1], "L", i[0], i[1], "L", j[0], j[1], "L", v[0], v[1], "L", l[0], l[1], "L", m[0], m[1], "L", n[0], n[1], "L", o[0], o[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var run = function(args) {
    args.ex = args.ex || [{
      dx : args.w,
      dy : args.h / 2
    }, {
      dx : args.w / 2,
      dy : 0
    }];
    var x = args.x + args.w / 2;
    var y = args.y + args.h / 2;
    /** @type {number} */
    var ext = args.w / 2;
    /** @type {number} */
    var unit = args.h / 2;
    var argValues = map(args);
    var val2 = argValues[0];
    var val1 = argValues[1];
    /** @type {number} */
    var isDefault = Math.abs(val1 - val2) >= Math.PI ? 1 : 0;
    var path = callback(x, y, ext, unit, val2, val1, true, isDefault);
    return path = path.concat(["L", x, y, "Z"]);
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var insert = function(args) {
    args.ex = args.ex || [{
      dx : args.w,
      dy : args.h / 2
    }, {
      dx : args.w / 2,
      dy : 0
    }];
    var value = args.x + args.w / 2;
    var index = args.y + args.h / 2;
    /** @type {number} */
    var collection = args.w / 2;
    /** @type {number} */
    var unit = args.h / 2;
    var argValues = map(args);
    var lab = argValues[0];
    var recurring = argValues[1];
    var current = callback(value, index, collection, unit, recurring, lab);
    return current = current.concat(["Z"]);
  };
  /**
   * @param {Object} node
   * @return {?}
   */
  var process = function(node) {
    var p = node.ex = node.ex || {
      dx : node.w,
      dy : 0
    };
    var value = node.x + node.w / 2;
    var index = node.y + node.h / 2;
    /** @type {number} */
    var collection = node.w / 2;
    /** @type {number} */
    var unit = node.h / 2;
    /** @type {Array} */
    var h = [node.x + p.dx, node.y + p.dy];
    /** @type {Array} */
    var i = [node.x + node.w, node.y];
    var current = callback(value, index, collection, unit, 3 * Math.PI / 2, 0);
    var k = current.slice(1, 3);
    return current = current.concat(["Q", i[0], i[1], h[0], h[1]]), current = current.concat(["Q", i[0], i[1], k[0], k[1]]), current = current.concat("Z");
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var remove = function(self) {
    var matrix = self.ex = self.ex || {
      dx : self.w / 5,
      dy : self.h / 5
    };
    var d = matrix.dx;
    var dy = matrix.dy;
    /** @type {number} */
    var x = self.w / 2;
    /** @type {number} */
    var i = self.h / 2;
    var value = self.x + x;
    var index = self.y + i;
    var key = callback(value, index, x, i, 0, 0.001);
    return key = key.concat(["Z"]).concat(callback(value, index, x - d, i - dy, 0, -0.001, true)).concat("Z");
  };
  /**
   * @param {Object} node
   * @return {?}
   */
  var _insert_subtree = function(node) {
    var options = node.ex = node.ex || {
      dx : node.w / 5,
      dy : 0
    };
    /** @type {number} */
    var radius = Math.min(options.dx, Math.min(node.h, node.w) / 2);
    /** @type {number} */
    var height = node.w / 2;
    /** @type {number} */
    var d = node.h / 2;
    var err = node.x + height;
    var v = node.y + d;
    /** @type {number} */
    radius = Math.max(radius, 0);
    var r = callback(err, v, height, d, 2 * Math.PI - 0.001, 0);
    /** @type {number} */
    var lR = 2 * radius / node.w;
    /** @type {number} */
    var pFW = Math.PI / 4;
    var dim = {
      x : node.x + radius,
      y : node.y + radius,
      w : node.w - 2 * radius,
      h : node.h - 2 * radius
    };
    /** @type {number} */
    var offset = dim.w / 2;
    /** @type {number} */
    var i = dim.h / 2;
    var value = dim.x + offset;
    var index = dim.y + i;
    var copyRect = {
      x : node.x + radius,
      y : node.y + radius,
      w : node.w - 2 * radius,
      h : node.h - 2 * radius
    };
    /** @type {number} */
    var type = copyRect.w / 2;
    /** @type {number} */
    var val = copyRect.h / 2;
    var msg = copyRect.x + type;
    var result = copyRect.y + val;
    var current = callback(value, index, offset, i, pFW - Math.PI - lR * (pFW - Math.PI), pFW - lR * pFW, true, 0);
    var message = callback(msg, result, type, val, pFW - 2 * Math.PI - lR * (pFW - Math.PI), pFW - lR * pFW - Math.PI, true, 0);
    return r.concat("Z").concat(current).concat("Z").concat(message).concat("Z");
  };
  /**
   * @param {Object} d
   * @return {?}
   */
  var init = function(d) {
    var matrix = d.ex = d.ex || {
      dx : d.w / 2,
      dy : d.h
    };
    var dx = matrix.dx;
    var dy = matrix.dy;
    /** @type {number} */
    var W = d.w / 6;
    /** @type {number} */
    var H = d.h / 6;
    /** @type {number} */
    var r = d.w / 2;
    /** @type {number} */
    var w = d.h / 2;
    var _ = d.x + r;
    var data = d.y + w;
    var dim = {
      x : d.x + d.w / 3 - W / 2,
      y : d.y + d.h / 3 - H / 2,
      w : W,
      h : H
    };
    /** @type {number} */
    var width = dim.w / 2;
    /** @type {number} */
    var i = dim.h / 2;
    /** @type {number} */
    var body = dim.x + width;
    /** @type {number} */
    var index = dim.y + i;
    var buf = callback(_, data, r, w, 2 * Math.PI - 0.001, 0);
    var a = callback(body, index, width, i, 2 * Math.PI - 0.001, 0);
    /** @type {number} */
    dim.x = 2 * _ - d.x - d.w / 3 - W / 2;
    /** @type {number} */
    body = dim.x + width;
    var value = callback(body, index, width, i, 2 * Math.PI - 0.001, 0);
    /** @type {Array} */
    var t = [d.x + d.w / 5, d.y + 2 * d.h / 3];
    /** @type {Array} */
    var u = [2 * _ - t[0], t[1]];
    /** @type {Array} */
    var caseSensitive = ["M", t[0], t[1], "Q", d.x + dx, d.y + dy, u[0], u[1]];
    return buf.concat("Z").concat(a).concat("Z").concat(value).concat("Z").concat(caseSensitive);
  };
  /**
   * @param {Object} camera
   * @return {?}
   */
  var update = function(camera) {
    var args = camera.ex = camera.ex || {
      dx : camera.w / 8,
      dy : camera.h / 2
    };
    var d = camera.x + camera.w / 2;
    var e = camera.y + camera.h / 2;
    var dim = {
      x : camera.x + args.dx,
      y : camera.y + camera.h * args.dx / camera.w,
      w : camera.w - 2 * args.dx,
      h : camera.h - 2 * (camera.h * args.dx / camera.w)
    };
    /** @type {number} */
    var i = dim.w / 2;
    /** @type {number} */
    var val = dim.h / 2;
    var row = dim.x + i;
    var n = dim.y + val;
    var ret = callback(row, n, i, val, 2 * Math.PI - 0.001, 0);
    /** @type {number} */
    var x = camera.w / 8;
    /** @type {number} */
    var interval = 1;
    if (x !== camera.w / 2) {
      /** @type {number} */
      interval = (args.dx - x) / (camera.w / 2 - x);
    }
    /** @type {number} */
    var w = args.dx - x * interval;
    /** @type {number} */
    var pixelMargin = camera.h * w / camera.w;
    /** @type {number} */
    var pieceHeight = camera.h / camera.w;
    /** @type {number} */
    var angle = Math.atan(pieceHeight * args.dx / (camera.w / 2 - args.dx)) * (1 - interval);
    var path = ret.concat("Z");
    /** @type {number} */
    var HALF_PI = 0;
    for (;HALF_PI < 8;HALF_PI++) {
      /** @type {Array} */
      var t = [camera.w / 2 * Math.cos(Math.PI / 4 * HALF_PI) + d, camera.h / 2 * Math.sin(Math.PI / 4 * HALF_PI) + e];
      /** @type {Array} */
      var u = [(camera.w - 2 * w) / 2 * Math.cos(angle + Math.PI / 4 * HALF_PI) + d, (camera.h - 2 * pixelMargin) / 2 * Math.sin(angle + Math.PI / 4 * HALF_PI) + e];
      /** @type {Array} */
      var v = [(camera.w - 2 * w) / 2 * Math.cos(Math.PI / 4 * HALF_PI - angle) + d, (camera.h - 2 * pixelMargin) / 2 * Math.sin(Math.PI / 4 * HALF_PI - angle) + e];
      path = path.concat(["M", t[0], t[1], "L", u[0], u[1], "L", v[0], v[1], "Z"]);
    }
    return path;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var fn = function(self) {
    var inEvent = self.ex = self.ex || {
      dx : self.w / 2,
      dy : self.h / 2
    };
    var x = inEvent.dx;
    var dim = {
      x : self.x,
      y : self.y,
      w : 2 * self.w,
      h : self.h
    };
    /** @type {number} */
    var offset = dim.w / 2;
    /** @type {number} */
    var i = dim.h / 2;
    var value = dim.x + offset;
    var index = dim.y + i;
    var pos = {
      x : self.x + x,
      y : self.y,
      w : 2 * self.w - 2 * x,
      h : self.h
    };
    /** @type {number} */
    var y = pos.w / 2;
    /** @type {number} */
    var w = pos.h / 2;
    var args = pos.x + y;
    var r = pos.y + w;
    var current = callback(value, index, offset, i, Math.PI / 2, -Math.PI / 2, true, 1);
    var a = slice(args, r, y, w, -Math.PI / 2, Math.PI / 2, false, 1);
    return current.concat(a);
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var resize = function(self) {
    var data = self.ex = self.ex || {
      dx : self.w / 5,
      dy : 0
    };
    var x = data.dx;
    /** @type {Array} */
    var d = [self.x, self.y];
    /** @type {Array} */
    var e = [self.x + self.w, self.y];
    /** @type {Array} */
    var f = [self.x + self.w, self.y + self.h];
    /** @type {Array} */
    var g = [self.x, self.y + self.h];
    /** @type {Array} */
    var h = [self.x + data.dx, self.y + x];
    /** @type {Array} */
    var i = [self.x + self.w - data.dx, h[1]];
    /** @type {Array} */
    var j = [i[0], self.y + self.h - x];
    /** @type {Array} */
    var k = [h[0], j[1]];
    /** @type {Array} */
    var arr = ["M", d[0], d[1], "L", e[0], e[1], "L", f[0], f[1], "L", g[0], g[1], "Z", "M", h[0], h[1], "L", k[0], k[1], "L", j[0], j[1], "L", i[0], i[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var get = function(self) {
    var events = self.ex = self.ex || [{
      dx : self.w / 5,
      dy : 0
    }, {
      dx : 0,
      dy : self.h / 5
    }];
    var x = events[0].dx;
    var y = events[1].dy;
    /** @type {Array} */
    var e = [self.x, self.y];
    /** @type {Array} */
    var f = [self.x + self.w, self.y];
    /** @type {Array} */
    var g = [self.x + self.w - y * self.w / self.h, self.y + y];
    /** @type {Array} */
    var h = [self.x + x, g[1]];
    /** @type {Array} */
    var i = [h[0], self.y + self.h - x * self.h / self.w];
    /** @type {Array} */
    var j = [self.x, self.y + self.h];
    /** @type {number} */
    events[0].dy = 0;
    /** @type {number} */
    events[1].dx = 0;
    /** @type {Array} */
    var arr = ["M", e[0], e[1], "L", f[0], f[1], "L", g[0], g[1], "L", h[0], h[1], "L", i[0], i[1], "L", j[0], j[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var set = function(self) {
    var inEvent = self.ex = self.ex || {
      dx : 3 * self.w / 5,
      dy : 0
    };
    var x = inEvent.dx;
    /** @type {Array} */
    var d = [self.x + x, self.y];
    /** @type {Array} */
    var e = [self.x + self.w, self.y];
    /** @type {Array} */
    var f = [self.x, self.y + self.h];
    /** @type {Array} */
    var g = [self.x, self.y + x * self.h / self.w];
    /** @type {Array} */
    var arr = ["M", d[0], d[1], "L", e[0], e[1], "L", f[0], f[1], "L", g[0], g[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var interpolatedEvents = function(self) {
    var point = self.ex = self.ex || {
      dx : self.w / 2,
      dy : 2 * self.h / 3
    };
    var x = point.dx;
    var y = point.dy;
    /** @type {Array} */
    var e = [self.x, self.y];
    /** @type {Array} */
    var f = [self.x + x, self.y];
    /** @type {Array} */
    var g = [self.x + x, self.y + y];
    /** @type {Array} */
    var h = [self.x + self.w, g[1]];
    /** @type {Array} */
    var i = [h[0], self.y + self.h];
    /** @type {Array} */
    var j = [self.x, self.y + self.h];
    /** @type {Array} */
    var arr = ["M", e[0], e[1], "L", f[0], f[1], "L", g[0], g[1], "L", h[0], h[1], "L", i[0], i[1], "L", j[0], j[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} data
   * @return {?}
   */
  var tick = function(data) {
    var events = data.ex = data.ex || [{
      dx : 0,
      dy : data.h / 2
    }, {
      dx : 3 * data.w / 4,
      dy : data.h / 2
    }];
    /** @type {number} */
    var i = data.w / 2;
    /** @type {number} */
    var d = data.h / 2;
    var n = data.x + i;
    var index = data.y + d;
    var result = map(data);
    var recurring = result[0];
    var item = result[1];
    /** @type {number} */
    var width = 0;
    /** @type {number} */
    var diff = 0;
    if (events[1].dy - d === 0) {
      /** @type {number} */
      width = events[1].dx - i;
      /** @type {number} */
      diff = data.h * (width / data.w);
    } else {
      if (events[1].dx - i === 0) {
        /** @type {number} */
        diff = events[1].dy - d;
        /** @type {number} */
        width = data.w * (diff / data.h);
      } else {
        /** @type {number} */
        width = (events[1].dx - i) / Math.cos(item);
        /** @type {number} */
        diff = (events[1].dy - d) / Math.sin(item);
      }
    }
    /** @type {number} */
    var isDefault = Math.abs(item - recurring) >= Math.PI ? 1 : 0;
    var ret = callback(n, index, i, d, recurring, item, true, isDefault);
    return ret = ret.concat(slice(n, index, Math.abs(width), Math.abs(diff), item, recurring, false, isDefault)), ret = ret.concat("Z");
  };
  /**
   * @param {Object} params
   * @return {?}
   */
  var draw = function(params) {
    var matrix = params.ex = params.ex || {
      dx : 3 * Math.min(params.w, params.h) / 4,
      dy : params.h
    };
    var dx = matrix.dx;
    var x = params.x;
    var offset = params.y;
    var width = params.w;
    var height = params.h;
    /** @type {number} */
    var i = width - dx;
    /** @type {number} */
    var aspectRatio = height / width;
    /** @type {number} */
    var theta2 = 2 * Math.atan(aspectRatio);
    /** @type {number} */
    var y = i * Math.cos(theta2);
    /** @type {number} */
    var d = i * Math.sin(theta2);
    /** @type {Array} */
    var arr = ["M", x + dx, offset + height, "L", x, offset + height, "L", x, offset, "L", x + width, offset, "L", x + width, offset + height - width + dx, "L", x + dx, offset + height, "L", x + dx + y, offset + height - d, "L", x + width, offset + height - width + dx];
    return[arr, ["M", x + dx, offset + height, "L", x + dx + y, offset + height - d, "L", x + width, offset + height - width + dx, "Z"]];
  };
  /**
   * @param {Object} params
   * @return {?}
   */
  var Rect = function(params) {
    var width = params.w;
    var height = params.h;
    var x = params.x;
    var y = params.y;
    var options = params.ex = params.ex || {
      dx : 3 * width / 4,
      dy : height / 4
    };
    var radius = options.dx;
    var r = options.dy;
    /** @type {Array} */
    var i = [x + radius, y + r];
    /** @type {Array} */
    var dirs = [x + width, y];
    /** @type {Array} */
    var arrPoint = [x + width - radius, y];
    /** @type {Array} */
    var a = [x, y + r];
    /** @type {Array} */
    var m = [x + radius, y + height];
    /** @type {Array} */
    var data = [x, y + height];
    /** @type {Array} */
    var o = [x + width, y + height - r];
    /** @type {Array} */
    var arr = ["M", dirs[0], dirs[1], "L", arrPoint[0], arrPoint[1], "L", a[0], a[1], "L", data[0], data[1], "L", m[0], m[1], "L", o[0], o[1], "Z", "L", i[0], i[1], "L", m[0], m[1], "M", a[0], a[1], "L", i[0], i[1]];
    return[arr, ["M", i[0], i[1], "L", m[0], m[1], "L", o[0], o[1], "L", dirs[0], dirs[1], "Z"]];
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var change = function(self) {
    var link = self.ex = self.ex || {
      dx : self.w / 2,
      dy : self.h / 2
    };
    var a = self.x;
    var i = self.y;
    var x = self.w;
    /** @type {number} */
    var p = x / 2;
    /** @type {number} */
    var w = link.dy / 2;
    var c = a + p;
    var j = i + self.h / 2;
    var index = i + w;
    var ret = callback(c, index, p, w, 0, Math.PI);
    return ret = ret.concat(["L", self.x, 2 * j - index]), ret = ret.concat(slice(c, 2 * j - index, p, w, Math.PI, 0)), ret = ret.concat(["Z"]), ret = ret.concat(callback(c, index, p, w, Math.PI, 0));
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var apply = function(self) {
    /** @type {number} */
    var i = self.w / 2;
    /** @type {number} */
    var d = self.h / 2;
    var link = self.x + i;
    var index = self.y + d;
    var b = callback(link, index, i, d, 2 * Math.PI - 0.001, 0);
    return b = b.concat("Z");
  };
  /**
   * @param {Object} obj
   * @return {?}
   */
  var reset = function(obj) {
    var x = obj.x;
    var y = obj.y;
    var length = obj.w;
    var height = obj.h;
    /** @type {number} */
    var dx = length / 2;
    /** @type {number} */
    var dy = height / 2;
    var x1 = x + dx;
    var y1 = y + dy;
    var events = obj.ex = obj.ex || [{
      dx : dx,
      dy : 0
    }, {
      dx : length,
      dy : dy
    }];
    var x2 = x + events[0].dx;
    var y0 = y + events[0].dy;
    var maxX = x + events[1].dx;
    var y2 = y + events[1].dy;
    /** @type {number} */
    var theta1 = Math.atan2(y0 - y1, x2 - x1);
    /** @type {number} */
    var theta2 = Math.atan2(y2 - y1, maxX - x1);
    /** @type {number} */
    var rot = theta2 - theta1;
    /** @type {number} */
    var r = 0;
    /** @type {Array} */
    var vec1 = [x1 + dx * Math.cos(theta1), y1 + dy * Math.sin(theta1)];
    /** @type {Array} */
    var right = [x1 + dx * Math.cos(theta2), y1 + dy * Math.sin(theta2)];
    return events[0].dx = vec1[0] - x, events[0].dy = vec1[1] - y, events[1].dx = right[0] - x, events[1].dy = right[1] - y, x2 = x + events[0].dx, y0 = y + events[0].dy, maxX = x + events[1].dx, y2 = y + events[1].dy, rot < 0 && (rot += 2 * Math.PI), r = rot > Math.PI ? 1 : 0, obj.style = obj.style || 2, ["M", x2, y0, "A", dx, dy, 0, r, 1, maxX, y2];
  };
  /**
   * @param {Object} img
   * @return {?}
   */
  var loop = function(img) {
    var x = img.x;
    var y = img.y;
    var w = img.w;
    var h = img.h;
    /** @type {Array} */
    var path = ["M", x, y, "L", x + w, y, "L", x + w, y + h, "L", x, y + h, "Z"];
    return path = path.concat(callback(x + w / 4, y + h / 3, 11 * w / 60, h / 4, Math.PI, -Math.PI / 4, 1, 0)), path = path.concat(callback(x + 9 * w / 20, y + 9 * h / 40, w / 6, h / 6, 5 * Math.PI / 4, -Math.PI / 4, 1, 0));
  };
  return{
    /** @type {function (Object): ?} */
    oval : apply,
    /** @type {function (Object): ?} */
    doc : processPath,
    /** @type {function (Object): ?} */
    docs : link,
    /** @type {function (Object): ?} */
    triangle : collideRect,
    /** @type {function (Object): ?} */
    cube : Rect,
    /** @type {function (Object): ?} */
    can : change,
    /** @type {function (Object): ?} */
    diamond : setup,
    /** @type {function (string): ?} */
    parallelogram : options,
    /** @type {function (Object): ?} */
    ladder : bounds,
    /** @type {function (Object): ?} */
    lbracket : onTouchStart,
    /** @type {function (Object): ?} */
    rbracket : constructor,
    /** @type {function (Object): ?} */
    brackets : center,
    /** @type {function (Object): ?} */
    lbrace : play,
    /** @type {function (Object): ?} */
    rbrace : setH,
    /** @type {function (Object): ?} */
    braces : move,
    /** @type {function (Object): ?} */
    cross : search,
    /** @type {function (Object): ?} */
    missingcorner : parseCommand,
    /** @type {function (Object): ?} */
    lightning : chunk,
    /** @type {function (Object): ?} */
    pie : run,
    /** @type {function (Object): ?} */
    chord : insert,
    /** @type {function (Object): ?} */
    teardrop : process,
    /** @type {function (Object): ?} */
    donut : remove,
    /** @type {function (Object): ?} */
    sun : update,
    /** @type {function (Object): ?} */
    moon : fn,
    /** @type {function (Object): ?} */
    frame : resize,
    /** @type {function (Object): ?} */
    halframe : get,
    /** @type {function (Object): ?} */
    diagonalstripe : set,
    /** @type {function (Object): ?} */
    lshape : interpolatedEvents,
    /** @type {function (Object): ?} */
    nosymbol : _insert_subtree,
    /** @type {function (Object): ?} */
    smileyface : init,
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon3 : function(template) {
      return render(template, 3, -Math.PI / 2);
    },
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon5 : function(template) {
      return render(template, 5, -Math.PI / 2);
    },
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon6 : function(template) {
      return render(template, 6);
    },
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon7 : function(template) {
      return render(template, 7, -Math.PI / 2);
    },
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon8 : function(template) {
      return render(template, 8);
    },
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon10 : function(template) {
      return render(template, 10);
    },
    /**
     * @param {Object} template
     * @return {?}
     */
    pollygon12 : function(template) {
      return render(template, 12);
    },
    /** @type {function (Object): ?} */
    cloud : lerp,
    /** @type {function (Object): ?} */
    heart : merge,
    /** @type {function (Object): ?} */
    blockarc : tick,
    /** @type {function (Object): ?} */
    foldedcorner : draw,
    /** @type {function (Object): ?} */
    arc : reset,
    /** @type {function (Object): ?} */
    cloud1 : loop
  };
}), function(dataAndEvents, factory) {
  /** @type {null} */
  var request = null;
  if ("function" == typeof define && define.amd) {
    define(["jh2d", "jh2d-type-rect"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      request = require("jh2d");
      var backbone = require("./jh2d-type-rect");
      module.exports = factory(request, backbone);
    } else {
      request = dataAndEvents.jh2d;
      request.types(factory(request, request.types()));
    }
  }
}(this, function(elem, e) {
  var options = elem.util;
  var f = options.describeArc;
  var test = options.calcOvalcallout;
  var fn = options.doRectEx;
  var color = options.EAST;
  var className = options.NORTH;
  var i = options.WEST;
  var h = options.SOUTH;
  /**
   * @param {Object} item
   * @return {?}
   */
  var render = function(item) {
    var text;
    var doneResults;
    /** @type {Array} */
    var p = [item.x, item.y];
    /** @type {Array} */
    var done = [-1, 0, 1, 0];
    /** @type {Array} */
    var CommandProxyMap = [0, -1, 0, 1];
    /** @type {number} */
    var temp0 = item.w < 0 ? -1 : 1;
    /** @type {number} */
    var temp1 = item.h < 0 ? -1 : 1;
    /** @type {number} */
    var type = -1;
    /** @type {null} */
    var util = null;
    if (item.ex) {
      /** @type {Array} */
      util = [item.x + item.ex.dx, item.y + item.ex.dy];
      fn(item, util, function(data, textAlt, fx) {
        /** @type {(Array|number)} */
        text = data;
        /** @type {(Array|number)} */
        doneResults = textAlt;
        /** @type {number} */
        type = fx;
        if ((type & (className | h)) === type) {
          if (item.h < 0) {
            /** @type {number} */
            type = (className | h) ^ fx;
          }
        }
        if (type === h) {
          /** @type {(Array|number)} */
          text = textAlt;
          /** @type {(Array|number)} */
          doneResults = data;
        }
        if ((type & (color | i)) === type) {
          if (item.w < 0) {
            /** @type {number} */
            type = (i | color) ^ fx;
          }
        }
        if (type === i) {
          /** @type {(Array|number)} */
          text = textAlt;
          /** @type {(Array|number)} */
          doneResults = data;
        }
      });
    }
    /** @type {Array} */
    var names = [className, color, h, i];
    /** @type {Array} */
    var path = [];
    /** @type {number} */
    var id = 0;
    for (;id < 4;id++) {
      var elems;
      /** @type {Array} */
      var thepicture = [p[0] - item.w * done[id], p[1] - item.h * CommandProxyMap[id]];
      if (item.corner) {
        /** @type {Array} */
        var ret = [];
        /** @type {Array} */
        ret = [p[0] + item.corner * CommandProxyMap[id] * temp0, p[1] - item.corner * done[id] * temp1];
        /** @type {Array} */
        ret = ret.concat(p);
        /** @type {Array} */
        elems = [p[0] - item.corner * done[id] * temp0, p[1] - item.corner * CommandProxyMap[id] * temp1];
        /** @type {Array} */
        ret = ret.concat(elems);
        /** @type {Array} */
        path = 0 === id ? path.concat(["M", ret[0], ret[1]]) : path.concat(["L", ret[0], ret[1]]);
        /** @type {Array} */
        path = path.concat("Q").concat(ret.slice(2));
      } else {
        /** @type {Array} */
        elems = p;
        /** @type {Array} */
        path = 0 === id ? path.concat(["M", elems[0], elems[1]]) : path.concat(["L", elems[0], elems[1]]);
      }
      if (type === names[id]) {
        /** @type {Array} */
        path = path.concat(["L", text[0], text[1], "L", util[0], util[1], "L", doneResults[0], doneResults[1]]);
      }
      /** @type {Array} */
      p = thepicture;
    }
    return path = path.concat("Z");
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var run = function(args) {
    return args.ex = args.ex || {
      dx : 0.1 * args.w,
      dy : args.h + 0.3 * args.h
    }, render(args);
  };
  /**
   * @param {Object} c
   * @return {?}
   */
  var next = function(c) {
    return c.corner = c.w / 6, run(c);
  };
  /**
   * @param {Object} last
   * @return {?}
   */
  var process = function(last) {
    var point = last.ex = last.ex || {
      dx : last.w / 6,
      dy : last.h + last.h / 6
    };
    var x = point.dx;
    var y = point.dy;
    /** @type {number} */
    var height = last.w / 2;
    /** @type {number} */
    var d = last.h / 2;
    var key = last.x + height;
    var v = last.y + d;
    var line = test(last);
    var recurring = line[0];
    var lab = line[1];
    var r = f(key, v, height, d, recurring, lab);
    return r = r.concat(["L", last.x + x, last.y + y, "Z"]);
  };
  /**
   * @param {Object} a
   * @return {?}
   */
  var update = function(a) {
    var x = e.rect(a);
    var cur = a.x;
    var y = a.y;
    var h = a.h;
    var codeSegments = a.ex;
    /** @type {Array} */
    var path = [];
    /** @type {number} */
    var i = 0;
    for (;i < codeSegments.length;i++) {
      /** @type {Array} */
      path = path.concat([0 === i ? "M" : "L", cur + codeSegments[i].dx, y + codeSegments[i].dy]);
    }
    return a.accent && (path = path.concat(["M", cur + codeSegments[0].dx, y, "L", cur + codeSegments[0].dx, y + h])), {
      d : x,
      dd : {
        d : path,
        style : 2
      }
    };
  };
  /**
   * @param {Object} t
   * @return {?}
   */
  var onTouchStart = function(t) {
    return t.ex = t.ex || [{
      dx : -t.w / 20,
      dy : t.h / 5
    }, {
      dx : -t.w / 3,
      dy : t.h + t.h / 10
    }], update(t);
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var move = function(args) {
    return args.ex = args.ex || [{
      dx : -args.w / 20,
      dy : args.h / 5
    }, {
      dx : -args.w / 4,
      dy : args.h / 5
    }, {
      dx : -args.w / 3,
      dy : args.h + args.h / 10
    }], update(args);
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var constructor = function(args) {
    return args.ex = args.ex || [{
      dx : -args.w / 20,
      dy : args.h / 5
    }, {
      dx : -args.w / 4,
      dy : args.h / 5
    }, {
      dx : -args.w / 3,
      dy : args.h
    }, {
      dx : -args.w / 10,
      dy : args.h + args.h / 10
    }], update(args);
  };
  return{
    /** @type {function (Object): ?} */
    ovalcallout : process,
    /** @type {function (Object): ?} */
    rectcallout : run,
    /** @type {function (Object): ?} */
    rrectcallout : next,
    /** @type {function (Object): ?} */
    linecallout1 : onTouchStart,
    /** @type {function (Object): ?} */
    linecallout2 : move,
    /** @type {function (Object): ?} */
    linecallout3 : constructor
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d));
    }
  }
}(this, function(util) {
  var $ = util.util;
  var fn = $.describeArc;
  /**
   * @param {Object} params
   * @return {?}
   */
  var tick = function(params) {
    var matrix = params.ex || {
      dx : 0,
      dy : Math.min(2 * params.h / 5, params.h / 2)
    };
    var width = params.w;
    var height = params.h;
    var a = params.x;
    var y = params.y;
    var k = a + width / 10;
    var sy1 = y + height / 10;
    var sum = a + width / 2;
    var x = y + height / 2;
    /** @type {number} */
    var dy = matrix.dy;
    /** @type {number} */
    var b = dy / height * width;
    /** @type {Array} */
    var arr = ["M", k, y + dy, "L", a + b, y + dy, "L", a + b, sy1, "L", 2 * sum - a - b, sy1, "L", 2 * sum - a - b, y + dy, "L", 2 * sum - k, y + dy, "L", 2 * sum - k, 2 * x - y - dy, "L", 2 * sum - a - b, 2 * x - y - dy, "L", 2 * sum - a - b, 2 * x - sy1, "L", a + b, 2 * x - sy1, "L", a + b, 2 * x - y - dy, "L", k, 2 * x - y - dy, "Z"];
    return arr;
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var move = function(args) {
    var matrix = args.ex = args.ex || {
      dx : 0,
      dy : Math.min(2 * args.h / 5, args.h / 2)
    };
    var d = args.w;
    var map = args.h;
    var i = args.x;
    var a = args.y;
    var x = i + d / 10;
    var t = i + d / 2;
    var sum = a + map / 2;
    var b = matrix.dy;
    /** @type {Array} */
    var arr = ["M", x, a + b, "L", 2 * t - x, a + b, "L", 2 * t - x, 2 * sum - a - b, "L", x, 2 * sum - a - b, "Z"];
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var update = function(self) {
    var matrix = self.ex = self.ex || {
      dx : 0,
      dy : Math.min(2 * self.h / 5, self.h / 2)
    };
    var width = self.w;
    var height = self.h;
    var a = self.x;
    var y = self.y;
    var k = a + width / 10;
    var sy1 = y + height / 10;
    var el = a + width / 2;
    var top = y + height / 2;
    var dy = matrix.dy;
    /** @type {number} */
    var b = dy / height * width;
    /** @type {Array} */
    var arr = ["M", k, y + dy, "L", a + b, y + dy, "L", a + b, sy1, "L", 2 * el - a - b, sy1, "L", 2 * el - a - b, y + dy, "L", 2 * el - k, y + dy, "L", 2 * el - k, 2 * top - y - dy, "L", 2 * el - a - b, 2 * top - y - dy, "L", 2 * el - a - b, 2 * top - sy1, "L", a + b, 2 * top - sy1, "L", a + b, 2 * top - y - dy, "L", k, 2 * top - y - dy, "Z"];
    /** @type {number} */
    var _z = Math.atan(height / width);
    /** @type {number} */
    var itemIndex = 0;
    for (;itemIndex < arr.length - 3;) {
      var _ = arr[itemIndex + 1];
      var val = arr[itemIndex + 2];
      var obj = $.rotate([el, top], [_, val], _z);
      arr[itemIndex + 1] = obj[0];
      arr[itemIndex + 2] = obj[1];
      itemIndex += 3;
    }
    return arr;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var render = function(self) {
    var width = self.w;
    var height = self.h;
    var cx = self.x;
    var y = self.y;
    var x = cx + width / 10;
    var t = cx + width / 2;
    var sy1 = y + height / 2;
    /** @type {number} */
    var h = Math.min(2 * self.h / 5, self.h / 2);
    /** @type {number} */
    var dx = h / height * width;
    var events = self.ex = self.ex || [{
      dx : 0,
      dy : h
    }, {
      dx : dx,
      dy : 0
    }, {
      dx : width,
      dy : height / 4
    }];
    h = events[0].dy;
    /** @type {Array} */
    var arr = ["M", x, y + h, "L", 2 * t - x, y + h, "L", 2 * t - x, 2 * sy1 - y - h, "L", x, 2 * sy1 - y - h, "Z"];
    /** @type {number} */
    var i = (width - 2 * events[1].dx) / 2;
    /** @type {number} */
    events[2].dy = Math.max(i, events[2].dy);
    /** @type {number} */
    events[2].dy = Math.min(h - i, events[2].dy);
    var index = y + events[2].dy;
    return arr = arr.concat(fn(t, index, i, i, 2 * Math.PI - 0.001, 0)), arr = arr.concat("Z"), arr = arr.concat(fn(t, 2 * sy1 - index, i, i, 2 * Math.PI - 0.001, 0)), arr = arr.concat("Z");
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var search = function(self) {
    var x = self.w;
    var h = self.h;
    var t = self.x;
    var y = self.y;
    var b = t + x / 10;
    var uid = t + x / 2;
    var sy1 = y + h / 2;
    var ex = self.ex = self.ex || [{
      dx : 0,
      dy : h / 5
    }, {
      dx : x,
      dy : 9 * h / 20
    }];
    var dy = ex[0].dy;
    var miny = ex[1].dy;
    /** @type {number} */
    var py = miny - dy;
    self.ex = ex;
    /** @type {Array} */
    var arr = ["M", b, y + dy, "L", 2 * uid - b, y + dy, "L", 2 * uid - b, y + dy + py, "L", b, y + dy + py, "Z", "M", b, 2 * sy1 - y - dy, "L", 2 * uid - b, 2 * sy1 - y - dy, "L", 2 * uid - b, 2 * sy1 - y - dy - py, "L", b, 2 * sy1 - y - dy - py, "Z"];
    return arr;
  };
  /**
   * @param {Object} conf
   * @return {?}
   */
  var init = function(conf) {
    var width = conf.w;
    var length = conf.h;
    var left = conf.x;
    var offset = conf.y;
    var centerX = left + width / 10;
    var a = left + width / 2;
    var max = offset + length / 2;
    var events = conf.ex = conf.ex || [{
      dx : 0,
      dy : length / 5
    }, {
      dx : width,
      dy : 9 * length / 20
    }];
    /** @type {number} */
    var start = Math.min(events[0].dy, conf.h / 2);
    /** @type {number} */
    var end = Math.min(events[1].dy, conf.h / 2);
    /** @type {number} */
    var b = (end - start) / 2;
    /** @type {Array} */
    var mat = [a - b, offset, a + b, offset, a + b, offset + length, a - b, offset + length];
    /** @type {number} */
    var _z = Math.PI / 9;
    /** @type {number} */
    var i = 0;
    for (;i < mat.length - 1;) {
      var style = mat[i];
      var m30 = mat[i + 1];
      var vec = $.rotate([a, max], [style, m30], _z);
      mat[i] = vec[0];
      mat[i + 1] = vec[1];
      i += 2;
    }
    var t = $.crossPoint([mat[2], mat[3]], [mat[4], mat[5]], [left, offset + start], [left + width, offset + start]);
    var u = $.crossPoint([mat[2], mat[3]], [mat[4], mat[5]], [left, offset + end], [left + width, offset + end]);
    var v = $.crossPoint([mat[2], mat[3]], [mat[4], mat[5]], [left, 2 * max - offset - end], [left + width, 2 * max - offset - end]);
    var w = $.crossPoint([mat[2], mat[3]], [mat[4], mat[5]], [left, 2 * max - offset - start], [left + width, 2 * max - offset - start]);
    var x = $.crossPoint([mat[0], mat[1]], [mat[6], mat[7]], [left, 2 * max - offset - start], [left + width, 2 * max - offset - start]);
    var y = $.crossPoint([mat[0], mat[1]], [mat[6], mat[7]], [left, 2 * max - offset - end], [left + width, 2 * max - offset - end]);
    var z = $.crossPoint([mat[0], mat[1]], [mat[6], mat[7]], [left, offset + end], [left + width, offset + end]);
    var A = $.crossPoint([mat[0], mat[1]], [mat[6], mat[7]], [left, offset + start], [left + width, offset + start]);
    return["M", mat[0], mat[1], "L", mat[2], mat[3], "L", t[0], t[1], "L", left + width, offset + start, "L", left + width, offset + end, "L", u[0], u[1], "L", v[0], v[1], "L", 2 * a - centerX, 2 * max - offset - end, "L", 2 * a - centerX, 2 * max - offset - start, "L", w[0], w[1], "L", mat[4], mat[5], "L", mat[6], mat[7], "L", x[0], x[1], "L", centerX, 2 * max - offset - start, "L", centerX, 2 * max - offset - end, "L", y[0], y[1], "L", z[0], z[1], "L", centerX, offset + end, "L", centerX, offset + 
    start, "L", A[0], A[1], "Z"];
  };
  return{
    /** @type {function (Object): ?} */
    plus : tick,
    /** @type {function (Object): ?} */
    minus : move,
    /** @type {function (Object): ?} */
    multiply : update,
    /** @type {function (Object): ?} */
    division : render,
    /** @type {function (Object): ?} */
    equal : search,
    /** @type {function (Object): ?} */
    notequal : init
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d", "jh2d-type-rect", "jh2d-type-basic"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      var jquery = require("jh2d");
      var backbone = require("./jh2d-type-rect");
      var wreqr = require("./jh2d-type-basic");
      jquery.types(backbone, wreqr);
      module.exports = factory(jquery, backbone, wreqr);
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d, dataAndEvents.jh2d.types()));
    }
  }
}(this, function(exports) {
  var _ = exports.util;
  var options = {};
  /** @type {Array.<?>} */
  var args = Array.prototype.slice.call(arguments, 1);
  var callback = _.describeArc;
  var func = _.describeArcL;
  if (1 === args.length) {
    options = args[0];
  } else {
    /** @type {number} */
    var i = 0;
    for (;i < args.length;i++) {
      _.extend(options, args[i]);
    }
  }
  /**
   * @param {Object} o
   * @return {?}
   */
  var remove = function(o) {
    /** @type {number} */
    var px = o.w / 2;
    /** @type {number} */
    var i = o.h / 2;
    var p = o.x + px;
    var index = o.y + i;
    /** @type {number} */
    var w = o.w / 6;
    var x = o.x + w;
    var key = callback(x, index, w, i, 3 * Math.PI / 2, Math.PI / 2);
    return key = key.concat(["L", 2 * p - x, o.y + o.h]).concat(callback(2 * p - x, index, w, i, Math.PI / 2, 3 * Math.PI / 2)).concat(["L", x, o.y]);
  };
  /**
   * @param {Object} position
   * @return {?}
   */
  var update = function(position) {
    /** @type {Array} */
    var b = [position.x + position.w / 4, position.y];
    /** @type {Array} */
    var origin = [b[0], position.y + position.h];
    var ts = position.x + position.w / 2;
    /** @type {Array} */
    var arr = ["M", position.x, position.y, "L", position.x + position.w, position.y, "L", position.x + position.w, position.y + position.h, "L", position.x, position.y + position.h, "Z", "M", b[0], b[1], "L", origin[0], origin[1], "M", 2 * ts - b[0], b[1], "L", 2 * ts - origin[0], origin[1]];
    return arr;
  };
  /**
   * @param {Object} r2
   * @return {?}
   */
  var collideRect = function(r2) {
    /** @type {Array} */
    var b = [r2.x + r2.w / 4, r2.y];
    /** @type {Array} */
    var c = [b[0], r2.y + r2.h];
    /** @type {Array} */
    var arr = ["M", r2.x, r2.y, "L", r2.x + r2.w, r2.y, "L", r2.x + r2.w, r2.y + r2.h, "L", r2.x, r2.y + r2.h, "Z", "M", b[0], b[1], "L", c[0], c[1], "M", r2.x, r2.y + r2.h / 4, "L", r2.x + r2.w, r2.y + r2.h / 4];
    return arr;
  };
  /**
   * @param {Object} l
   * @return {?}
   */
  var setup = function(l) {
    /** @type {Array} */
    var b = [l.x, l.y + l.h / 5];
    /** @type {Array} */
    var c = [l.x + l.w, l.y];
    /** @type {Array} */
    var d = [l.x + l.w, l.y + l.h];
    /** @type {Array} */
    var e = [l.x, l.y + l.h];
    /** @type {Array} */
    var arr = ["M", b[0], b[1], "L", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} other
   * @return {?}
   */
  var constructor = function(other) {
    return other.ex = other.ex || {
      dx : other.w / 4,
      dy : other.h + 10
    }, other.initRotate = 0, options.ladder(other);
  };
  /**
   * @param {Object} l
   * @return {?}
   */
  var zoom = function(l) {
    /** @type {Array} */
    var b = [l.x, l.y];
    /** @type {Array} */
    var c = [l.x + l.w, l.y];
    /** @type {Array} */
    var d = [l.x + l.w, l.y + 4 * l.h / 5];
    /** @type {Array} */
    var e = [l.x + l.w / 2, l.y + l.h];
    /** @type {Array} */
    var f = [l.x, l.y + 4 * l.h / 5];
    /** @type {Array} */
    var rightArrow = ["M", b[0], b[1], "L", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "L", f[0], f[1], "Z"];
    return rightArrow;
  };
  /**
   * @param {Object} l
   * @return {?}
   */
  var processPath = function(l) {
    /** @type {Array} */
    var b = [l.x, l.y + l.h / 5];
    /** @type {Array} */
    var c = [l.x + l.w / 5, l.y];
    /** @type {Array} */
    var d = [l.x + l.w, l.y];
    /** @type {Array} */
    var e = [l.x + l.w, l.y + l.h];
    /** @type {Array} */
    var f = [l.x, l.y + l.h];
    /** @type {Array} */
    var rightArrow = ["M", b[0], b[1], "L", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "L", f[0], f[1], "Z"];
    return rightArrow;
  };
  /**
   * @param {Object} position
   * @return {?}
   */
  var bounds = function(position) {
    /** @type {number} */
    var offsetX = position.w / 2;
    /** @type {number} */
    var height = position.h / 2;
    var originalX = position.x + offsetX;
    var flashvars = position.y + height;
    /** @type {number} */
    var offsetY = height / 5;
    var originalY = position.y + offsetY;
    /** @type {Array} */
    var arr = ["M", position.x, position.y + offsetY, "C", position.x, position.y, originalX, position.y, originalX, position.y + offsetY, "S", position.x + position.w, 2 * originalY - position.y, position.x + position.w, originalY, "L", position.x + position.w, 2 * flashvars - originalY, "C", position.x + position.w, position.y + position.h, originalX, position.y + position.h, originalX, 2 * flashvars - originalY, "S", position.x, 2 * flashvars - originalY - offsetY, position.x, 2 * flashvars - 
    originalY, "Z"];
    return arr;
  };
  /**
   * @param {Object} d
   * @return {?}
   */
  var render = function(d) {
    /** @type {number} */
    var value = d.w / 2;
    /** @type {number} */
    var w = d.h / 2;
    var id = d.x + value;
    var r = d.y + w;
    var val = callback(id, r, value, w, 2 * Math.PI - 0.001, 0);
    /** @type {Array} */
    var h = [d.w / 2 * Math.cos(Math.PI / 4) + id, d.h / 2 * Math.sin(Math.PI / 4) + r];
    /** @type {Array} */
    var i = [d.w / 2 * Math.cos(Math.PI / 4 + Math.PI) + id, d.h / 2 * Math.sin(Math.PI / 4 + Math.PI) + r];
    return val = val.concat(["Z", "M", h[0], h[1], "L", i[0], i[1], "M", h[0], 2 * r - h[1], "L", i[0], 2 * r - i[1]]);
  };
  /**
   * @param {Object} p
   * @return {?}
   */
  var init = function(p) {
    /** @type {number} */
    var width = p.w / 2;
    /** @type {number} */
    var i = p.h / 2;
    var o = p.x + width;
    var index = p.y + i;
    var key = callback(o, index, width, i, 2 * Math.PI - 0.001, 0);
    return key = key.concat(["Z", "M", p.x, index, "L", p.x + p.w, index, "M", o, p.y, "L", o, p.y + p.h]);
  };
  /**
   * @param {Object} area
   * @return {?}
   */
  var center = function(area) {
    /** @type {Array} */
    var b = [area.x, area.y];
    /** @type {Array} */
    var c = [area.x + area.w, area.y];
    /** @type {Array} */
    var d = [area.x, area.y + area.h];
    /** @type {Array} */
    var e = [area.x + area.w, area.y + area.h];
    /** @type {Array} */
    var arr = ["M", b[0], b[1], "L", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "Z"];
    return arr;
  };
  /**
   * @param {Object} quad_2
   * @return {?}
   */
  var quadsCollision = function(quad_2) {
    /** @type {Array} */
    var b = [quad_2.x + quad_2.w / 2, quad_2.y];
    /** @type {Array} */
    var c = [quad_2.x + quad_2.w, quad_2.y + quad_2.h / 2];
    /** @type {Array} */
    var d = [quad_2.x + quad_2.w / 2, quad_2.y + quad_2.h];
    /** @type {Array} */
    var e = [quad_2.x, quad_2.y + quad_2.h / 2];
    /** @type {Array} */
    var arr = ["M", c[0], c[1], "L", d[0], d[1], "L", e[0], e[1], "L", b[0], b[1], "L", c[0], c[1], "L", e[0], e[1]];
    return arr;
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var handleInput = function(e) {
    return void 0 === e.initRotate && (e.initRotate = Math.PI), options.triangle(e);
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var change = function(e) {
    /** @type {number} */
    var px = e.w / 2;
    /** @type {number} */
    var i = e.h / 2;
    var l = e.x + px;
    var index = e.y + i;
    /** @type {number} */
    var r = e.w / 6;
    var v = e.x + r;
    var key = callback(v, index, r, i, 3 * Math.PI / 2, Math.PI / 2);
    return key = key.concat(["L", 2 * l - v, e.y + e.h]).concat(callback(2 * l - v, index, r, i, Math.PI / 2, 3 * Math.PI / 2, true)).concat(["L", v, e.y]);
  };
  /**
   * @param {Object} size
   * @return {?}
   */
  var run = function(size) {
    /** @type {number} */
    var px = size.w / 2;
    /** @type {number} */
    var i = size.h / 2;
    var tabPageHeight = size.x + px;
    var index = size.y + i;
    /** @type {number} */
    var dy = size.w / 2;
    var lastPointY = size.x + dy;
    /** @type {Array} */
    var path = ["M", size.x, size.y, "L", size.x, size.y + size.h];
    return path = path.concat(["L", 2 * tabPageHeight - lastPointY, size.y + size.h]).concat(func(2 * tabPageHeight - lastPointY, index, dy, i, Math.PI / 2, 3 * Math.PI / 2)).concat("Z");
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var move = function(self) {
    /** @type {number} */
    var i = self.w / 2;
    /** @type {number} */
    var val = self.h / 2;
    var link = self.x + i;
    var result = self.y + val;
    var path = callback(link, result, i, val, Math.PI / 4, Math.PI / 2);
    return path = path.concat(["L", self.x + self.w, self.y + self.h, "L", self.x + self.w, path[2], "Z"]);
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var fn = function(self) {
    var options = self.ex = self.ex || {
      dx : self.w / 2,
      dy : self.h / 2
    };
    /** @type {number} */
    var i = self.h / 2;
    /** @type {number} */
    var value = options.dx / 2;
    var index = self.y + i;
    var l = self.x + self.w / 2;
    var v = self.x + value;
    var ret = callback(v, index, value, i, -Math.PI / 2, Math.PI / 2);
    return ret = ret.concat(["L", 2 * l - v, self.y + self.h]), ret = ret.concat(func(2 * l - v, index, value, i, Math.PI / 2, -Math.PI / 2)), ret = ret.concat(["L", v, self.y]), ret = ret.concat(callback(v, index, value, i, Math.PI / 2, -Math.PI / 2));
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var search = function(self) {
    /** @type {number} */
    var px = self.w / 2;
    /** @type {number} */
    var i = self.h / 2;
    var tabPageHeight = self.x + px;
    var index = self.y + i;
    /** @type {number} */
    var value = self.w / 6;
    var tval = self.x + value;
    /** @type {Array} */
    var arr = ["M", self.x + self.w / 6, self.y, "L", self.x, index, "L", self.x + self.w / 6, self.y + self.h];
    return arr = arr.concat(func(2 * tabPageHeight - tval, index, value, i, Math.PI / 2, 3 * Math.PI / 2)).concat("Z");
  };
  return{
    process : options.rect,
    altproc : options.rrect,
    decision : options.diamond,
    data : options.parallelogram,
    preparation : options.pollygon6,
    connector : options.oval,
    extract : options.triangle,
    magstorage : options.can,
    /** @type {function (Object): ?} */
    terminator : remove,
    /** @type {function (Object): ?} */
    predefproc : update,
    /** @type {function (Object): ?} */
    interstorage : collideRect,
    /** @type {function (Object): ?} */
    manualinput : setup,
    /** @type {function (Object): ?} */
    manualoper : constructor,
    /** @type {function (Object): ?} */
    offpageconn : zoom,
    /** @type {function (Object): ?} */
    card : processPath,
    /** @type {function (Object): ?} */
    punchedtape : bounds,
    /** @type {function (Object): ?} */
    summingjunction : render,
    /** @type {function (Object): ?} */
    or : init,
    /** @type {function (Object): ?} */
    collate : center,
    /** @type {function (Object): ?} */
    sort : quadsCollision,
    /** @type {function (Object): ?} */
    merge : handleInput,
    /** @type {function (Object): ?} */
    storeddata : change,
    /** @type {function (Object): ?} */
    delay : run,
    /** @type {function (Object): ?} */
    seqstorage : move,
    /** @type {function (Object): ?} */
    directstorage : fn,
    /** @type {function (Object): ?} */
    display : search
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d));
    }
  }
}(this, function(exports) {
  var self = exports.util;
  /**
   * @param {Object} options
   * @return {?}
   */
  var render = function(options) {
    var events = options.ex;
    var len = events && events.length;
    if (len > 1) {
      /** @type {Array} */
      var e = [options.x + events[0].dx, options.y + events[0].dy];
      /** @type {Array} */
      var caseSensitive = [options.x + events[1].dx, options.y + events[1].dy];
      /** @type {Array} */
      var path = ["M", e[0], e[1]];
      if (len > 2) {
        /** @type {null} */
        var t = null;
        /** @type {null} */
        var p = null;
        /** @type {number} */
        var i = 0;
        for (;i < len;i++) {
          /** @type {Array} */
          var tail = [options.x + events[i].dx, options.y + events[i].dy];
          /** @type {Array} */
          var value = [options.x + events[(i + 1) % len].dx, options.y + events[(i + 1) % len].dy];
          /** @type {Array} */
          var sub = [options.x + events[(i + 2) % len].dx, options.y + events[(i + 2) % len].dy];
          var s = draw(tail, value, sub);
          if (0 === i ? (path = options.closed ? ["M"].concat(value) : path.concat(["Q"]).concat(s[0]).concat(value), t = s) : path = path.concat(["C"]).concat(p[1]).concat(s[0]).concat(value), p = s, !options.closed && i === len - 3) {
            /** @type {Array} */
            path = path.concat(["Q"]).concat(s[1]).concat(sub);
            break;
          }
        }
        if (options.closed) {
          /** @type {Array} */
          path = path.concat(["C"]).concat(p[1]).concat(t[0]).concat(caseSensitive);
          path.push("Z");
        }
      } else {
        /** @type {Array} */
        path = path.concat(["L"]).concat(caseSensitive);
      }
      return path;
    }
  };
  /**
   * @param {Array} a
   * @param {Array} b
   * @param {Array} event
   * @return {?}
   */
  var draw = function(a, b, event) {
    /** @type {number} */
    var arg = 0;
    /** @type {number} */
    var slope = 0;
    /** @type {number} */
    var result = Math.PI / 2;
    /** @type {number} */
    var alpha = Math.PI / 2;
    if (b[0] - a[0] !== 0) {
      /** @type {number} */
      arg = (b[1] - a[1]) / (b[0] - a[0]);
      /** @type {number} */
      result = Math.atan(arg);
      if (a[0] - b[0] > 0) {
        if (arg < 0) {
          result += 2 * Math.PI;
        }
      } else {
        result += Math.PI;
      }
    } else {
      if (a[1] < b[1]) {
        result += Math.PI;
      }
    }
    if (b[0] - event[0] !== 0) {
      /** @type {number} */
      slope = (event[1] - b[1]) / (event[0] - b[0]);
      /** @type {number} */
      alpha = Math.atan(slope);
      if (event[0] - b[0] > 0) {
        if (slope < 0) {
          alpha += 2 * Math.PI;
        }
      } else {
        alpha += Math.PI;
      }
    } else {
      if (event[1] < b[1]) {
        alpha += Math.PI;
      }
    }
    /** @type {number} */
    var now = alpha + (result - alpha) / 2;
    var c = self.rotate([b[0], b[1]], a, Math.PI / 2 - now);
    var e = self.rotate([b[0], b[1]], event, Math.PI / 2 - now);
    /** @type {Array} */
    var origin = [c[0] - (c[0] - b[0]) / 2, b[1]];
    /** @type {Array} */
    var v = [e[0] - (e[0] - b[0]) / 2, b[1]];
    return[self.rotate([b[0], b[1]], origin, Math.PI / 2 - now, -1), self.rotate([b[0], b[1]], v, Math.PI / 2 - now, -1)];
  };
  /**
   * @param {Object} item
   * @return {?}
   */
  var process = function(item) {
    /** @type {Array} */
    var d = [];
    if (item.ex && item.ex.length > 1) {
      /** @type {number} */
      var i = 0;
      for (;i < item.ex.length;i++) {
        var shadow = item.ex[i];
        /** @type {Array} */
        d = d.concat([0 === i ? "M" : "L", item.x + shadow.dx, item.y + shadow.dy]);
      }
      if (item.closed) {
        d.push("Z");
      }
    }
    return d;
  };
  /**
   * @param {Object} params
   * @return {?}
   */
  var update = function(params) {
    var x0 = params.x;
    var y = params.y;
    var x = params.w;
    var height = params.h;
    var methods = params.ex || [];
    /** @type {Array} */
    var path = ["M", x0, y];
    if (!self.isArray(methods)) {
      /** @type {Array} */
      methods = [methods];
    }
    /** @type {number} */
    var i = 0;
    for (;i < methods.length;i++) {
      var obj = methods[i];
      /** @type {Array} */
      path = path.concat(["L", x0 + obj.dx, y + obj.dy]);
    }
    return path = path.concat(["L", x0 + x, y + height]);
  };
  /**
   * @param {Object} box
   * @return {?}
   */
  var distance = function(box) {
    var right = box.x;
    var top = box.y;
    var left = box.w;
    var height = box.h;
    return["M", right, top, "L", right + left, top + height, "M", right + left, top, "L", right, top + height];
  };
  /**
   * @param {Object} d
   * @return {?}
   */
  var Player = function(d) {
    var options = d.ex = d.ex || {
      dx : 3 * d.w / 4,
      dy : d.h / 4
    };
    return["M", d.x, d.y, "q", options.dx, options.dy, d.w, d.h];
  };
  /**
   * @param {Object} args
   * @return {?}
   */
  var resize = function(args) {
    var events = args.ex = args.ex || [{
      dx : args.w,
      dy : 0
    }, {
      dx : 0,
      dy : args.h
    }];
    return["M", args.x, args.y, "c", events[0].dx, events[0].dy, events[1].dx, events[1].dy, args.w, args.h];
  };
  return{
    /** @type {function (Object): ?} */
    line : update,
    /** @type {function (Object): ?} */
    linex : Player,
    /** @type {function (Object): ?} */
    linexx : resize,
    /** @type {function (Object): ?} */
    freeform : process,
    /** @type {function (Object): ?} */
    curve : render,
    /** @type {function (Object): ?} */
    x : distance
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d));
    }
  }
}(this, function() {
  /**
   * @param {Object} rect
   * @param {boolean} force
   * @return {?}
   */
  var render = function(rect, force) {
    var inEvent = rect.ex = rect.ex || {
      dx : 5 * rect.w / 6,
      dy : 0
    };
    var x = inEvent.dx;
    /** @type {number} */
    var indexX = x / rect.w;
    /** @type {number} */
    var hh = rect.h * (1 - indexX);
    /** @type {Array} */
    var arr = ["M", rect.x, rect.y];
    /** @type {Array} */
    var rest = ["L", rect.x + x, rect.y];
    /** @type {Array} */
    var p = ["Q", rect.x + rect.w, rect.y];
    /** @type {Array} */
    var className = [rect.x + rect.w, rect.y + hh];
    /** @type {Array} */
    var keys = ["L", rect.x + rect.w, rect.y + rect.h];
    /** @type {Array} */
    var caseSensitive = ["L", rect.x, rect.y + rect.h];
    /** @type {Array} */
    var u = arr.concat(rest);
    return u = force ? u.concat("L").concat(className) : u.concat(p).concat(className), u = u.concat(keys).concat(caseSensitive).concat("z");
  };
  /**
   * @param {Object} data
   * @return {?}
   */
  var template = function(data) {
    return render(data, false);
  };
  /**
   * @param {Object} body
   * @return {?}
   */
  var _do_while = function(body) {
    return render(body, true);
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var update = function(self) {
    var inEvent = self.ex = self.ex || {
      dx : self.w / 6,
      dy : 0
    };
    var x = inEvent.dx;
    /** @type {number} */
    var mult = x / self.w;
    /** @type {number} */
    var val = self.h * mult;
    var f = self.x + self.w / 2;
    var g = self.y + self.h / 2;
    /** @type {Array} */
    var regularResults = [self.x, self.y + val];
    /** @type {Array} */
    var fh = [self.x + x, self.y];
    /** @type {Array} */
    var caseSensitive = ["Q", self.x, self.y];
    /** @type {Array} */
    var STRINGS = ["L", 2 * f - fh[0], fh[1]];
    /** @type {Array} */
    var oldIEIgnorables = ["Q", self.x + self.w, self.y];
    /** @type {Array} */
    var attrs = [2 * f - regularResults[0], regularResults[1]];
    /** @type {Array} */
    var children = ["L", 2 * f - regularResults[0], 2 * g - regularResults[1]];
    /** @type {Array} */
    var dependencies = ["Q", self.x + self.w, self.y + self.h];
    /** @type {Array} */
    var p = [2 * f - fh[0], 2 * g - fh[1]];
    /** @type {Array} */
    var localeArgs = ["L", fh[0], 2 * g - fh[1]];
    /** @type {Array} */
    var UNICODE_COMBINING_MARK_RANGES = ["Q", self.x, self.y + self.h];
    /** @type {Array} */
    var before = [regularResults[0], 2 * g - regularResults[1]];
    /** @type {Array} */
    var arr = ["M"].concat(regularResults).concat(caseSensitive).concat(fh).concat(STRINGS).concat(oldIEIgnorables).concat(attrs).concat(children).concat(dependencies).concat(p).concat(localeArgs).concat(UNICODE_COMBINING_MARK_RANGES).concat(before).concat("Z");
    return arr;
  };
  /**
   * @param {Object} p
   * @return {?}
   */
  var collideRect = function(p) {
    return["M", p.x, p.y, "l", p.w, 0, "l", 0, p.h, "l", -p.w, 0, "z"];
  };
  /**
   * @param {Object} node
   * @param {boolean} force
   * @return {?}
   */
  var init = function(node, force) {
    var args = node.ex = node.ex || [{
      dx : 5 * node.w / 6,
      dy : 0
    }, {
      dx : 0,
      dy : node.h
    }];
    var p = args[0];
    var options = args[1];
    var dx = p.dx;
    var d = options.dx;
    /** @type {number} */
    var rat = dx / node.w;
    /** @type {number} */
    var destY = d / node.w;
    /** @type {number} */
    var yOffset = node.h * (1 - rat);
    /** @type {number} */
    var radius = node.h * (1 - destY);
    var l = node.x + node.w / 2;
    /** @type {Array} */
    var caseSensitive = [node.x + dx, node.y];
    /** @type {Array} */
    var r = ["Q", node.x + node.w, node.y];
    /** @type {Array} */
    var className = [node.x + node.w, node.y + yOffset];
    /** @type {Array} */
    var fileName = ["M", 2 * l - className[0], className[1]];
    /** @type {Array} */
    var list = ["Q", node.x, node.y];
    /** @type {Array} */
    var more = [2 * l - caseSensitive[0], caseSensitive[1]];
    /** @type {Array} */
    var sub = [node.x + d, node.y + node.h];
    /** @type {Array} */
    var items = ["Q", node.x, sub[1]];
    /** @type {Array} */
    var rv = [node.x, node.y + radius];
    /** @type {Array} */
    var attrs = ["L", 2 * l - rv[0], rv[1]];
    /** @type {Array} */
    var n = ["Q", node.x + node.w, node.y + node.h];
    /** @type {Array} */
    var otherArgs = [2 * l - sub[0], sub[1]];
    /** @type {Array} */
    var path = fileName;
    return path = force ? path.concat("L").concat(more) : path.concat(list).concat(more), path = path.concat("L").concat(caseSensitive), path = force ? path.concat("L").concat(className) : path.concat(r).concat(className), path = path.concat(attrs), path = force ? path.concat("L").concat(otherArgs) : path.concat(n).concat(otherArgs), path = path.concat("L").concat(sub), path = force ? path.concat("L").concat(rv) : path.concat(items).concat(rv), path.concat("Z");
  };
  /**
   * @param {Object} cb
   * @return {?}
   */
  var setLng = function(cb) {
    return init(cb, true);
  };
  /**
   * @param {Object} cb
   * @return {?}
   */
  var preload = function(cb) {
    return init(cb, false);
  };
  /**
   * @param {Object} position
   * @param {boolean} recurring
   * @return {?}
   */
  var bounds = function(position, recurring) {
    var events = position.ex = position.ex || [{
      dx : position.w / 6,
      dy : 0
    }, {
      dx : position.w,
      dy : 0
    }];
    var w = events[0].dx;
    var width = events[1].dx;
    /** @type {number} */
    var ratio = w / position.w;
    /** @type {number} */
    var halfWidth = width / position.w;
    /** @type {number} */
    var height = position.h * ratio;
    /** @type {number} */
    var offsetY = position.h * (1 - halfWidth);
    var j = position.x + position.w / 2;
    var k = position.y + position.h / 2;
    /** @type {Array} */
    var caseSensitive = [position.x, position.y + height];
    /** @type {Array} */
    var base = [position.x + w, position.y];
    /** @type {Array} */
    var caseInsensitive = [position.x, position.y];
    /** @type {Array} */
    var data = [position.x + width, position.y];
    /** @type {Array} */
    var name = [position.x + position.w, position.y + offsetY];
    /** @type {Array} */
    var parentName = [position.x + position.w, position.y];
    /** @type {Array} */
    var startY = [position.x + position.w, 2 * k - caseSensitive[1]];
    /** @type {Array} */
    var value = [2 * j - base[0], position.y + position.h];
    /** @type {Array} */
    var val = [position.x + position.w, position.y + position.h];
    /** @type {Array} */
    var inputVal = [2 * j - data[0], position.y + position.h];
    /** @type {Array} */
    var fragments = [position.x, 2 * k - name[1]];
    /** @type {Array} */
    var input = [position.x, position.y + position.h];
    /** @type {Array} */
    var path = ["M"].concat(caseSensitive);
    return path = recurring ? path.concat("L", base) : path.concat("Q", caseInsensitive, base), path = path.concat("L", data), path = recurring ? path.concat("L", name) : path.concat("Q", parentName, name), path = path.concat("L", startY), path = recurring ? path.concat("L", value) : path.concat("Q", val, value), path = path.concat("L", inputVal), path = recurring ? path.concat("L", fragments, "Z") : path.concat("Q", input, fragments, "Z");
  };
  /**
   * @param {Object} positionError
   * @return {?}
   */
  var fail = function(positionError) {
    return bounds(positionError, true);
  };
  /**
   * @param {Object} positionError
   * @return {?}
   */
  var errorListener = function(positionError) {
    return bounds(positionError, false);
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var processPath = function(self) {
    var data = self.ex = self.ex || [{
      dx : self.w / 6,
      dy : 0
    }, {
      dx : 5 * self.w / 6,
      dy : 0
    }];
    var x = data[0].dx;
    var distance = data[1].dx;
    /** @type {number} */
    var mult = x / self.w;
    /** @type {number} */
    var points = distance / self.w;
    /** @type {number} */
    var val = self.h * mult;
    /** @type {number} */
    var value = self.h * (1 - points);
    /** @type {Array} */
    var beginswith = ["M", self.x, self.y + val];
    /** @type {Array} */
    var caseInsensitive = [self.x + x, self.y];
    /** @type {Array} */
    var caseSensitive = ["Q", self.x, self.y];
    /** @type {Array} */
    var forPartFragments = ["L", self.x + distance, self.y];
    /** @type {Array} */
    var catchPart = ["L", self.x + self.w, self.y + value];
    /** @type {Array} */
    var outname = ["L", self.x + self.w, self.y + self.h];
    /** @type {Array} */
    var r20 = ["L", self.x, self.y + self.h, "Z"];
    return beginswith.concat(caseSensitive, caseInsensitive, forPartFragments, catchPart, outname, r20);
  };
  return{
    /** @type {function (Object): ?} */
    rect : collideRect,
    /** @type {function (Object): ?} */
    rrect : update,
    /** @type {function (Object): ?} */
    srrect : template,
    /** @type {function (Object): ?} */
    ssrect : _do_while,
    /** @type {function (Object): ?} */
    sssrect : setLng,
    /** @type {function (Object): ?} */
    ssrrect : preload,
    /** @type {function (Object): ?} */
    dsrect : fail,
    /** @type {function (Object): ?} */
    drrect : errorListener,
    /** @type {function (Object): ?} */
    sasrrect : processPath
  };
}), function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      dataAndEvents.jh2d.types(factory(dataAndEvents.jh2d));
    }
  }
}(this, function(modular) {
  var util = modular.util;
  /**
   * @param {Object} l
   * @return {?}
   */
  var init = function(l) {
    /** @type {Array} */
    var resultItems = [[l.x, l.y + l.h / 12], [l.x + 1 * l.w / 3, l.y + l.h / 4], [l.x + 4 * l.w / 10, l.y + l.h / 10], [l.x + l.w / 2, l.y + l.h / 4], [l.x + 2 * l.w / 3, l.y], [l.x + 2 * l.w / 3, l.y + l.h / 4], [l.x + 5 * l.w / 6, l.y + l.h / 5], [l.x + 3 * l.w / 4, l.y + l.h / 3], [l.x + l.w, l.y + 3 * l.h / 8], [l.x + 5 * l.w / 6, l.y + l.h / 2], [l.x + l.w, l.y + 5 * l.h / 8], [l.x + 3 * l.w / 4, l.y + 5 * l.h / 8], [l.x + 5 * l.w / 6, l.y + 5 * l.h / 6], [l.x + 5 * l.w / 8, l.y + 3 * l.h / 
    4], [l.x + 6 * l.w / 10, l.y + 9 * l.h / 10], [l.x + l.w / 2, l.y + 3 * l.h / 4], [l.x + 3 * l.w / 8, l.y + l.h], [l.x + l.w / 3, l.y + 9 * l.h / 12], [l.x + l.w / 5, l.y + 10 * l.h / 12], [l.x + l.w / 4, l.y + 8 * l.h / 12], [l.x, l.y + 8 * l.h / 12], [l.x + l.w / 5, l.y + 6 * l.h / 12], [l.x, l.y + 5 * l.h / 12], [l.x + l.w / 4, l.y + 4 * l.h / 12]];
    /** @type {Array} */
    var classList = [];
    /** @type {number} */
    var i = 0;
    for (;i < resultItems.length;i++) {
      var result = resultItems[i];
      /** @type {Array} */
      classList = classList.concat([0 === i ? "M" : "L", result[0], result[1]]);
    }
    return classList.concat("Z");
  };
  /**
   * @param {Object} bytes
   * @param {number} opt_attributes
   * @param {number} deepDataAndEvents
   * @return {?}
   */
  var kb = function(bytes, opt_attributes, deepDataAndEvents) {
    var codeSegments = util.star(bytes, opt_attributes, deepDataAndEvents);
    /** @type {Array} */
    var path = ["M", codeSegments[0][0], codeSegments[0][1]];
    /** @type {number} */
    var i = 1;
    for (;i < codeSegments.length;i++) {
      /** @type {Array} */
      path = path.concat(["L", codeSegments[i][0], codeSegments[i][1]]);
    }
    return path.concat("Z");
  };
  /**
   * @param {Object} position
   * @return {?}
   */
  var bounds = function(position) {
    var events = position.ex || [{
      dx : position.w / 2,
      dy : position.h + 10
    }, {
      dx : -10,
      dy : position.h / 4
    }];
    var x = events[0].dx;
    var offsetY = events[1].dy;
    var ts = position.y + position.h / 2;
    /** @type {number} */
    var distX = x - position.w / 2;
    /** @type {number} */
    var halfwidth = 2 * Math.abs(distX);
    /** @type {number} */
    var y = position.w - halfwidth;
    /** @type {Array} */
    var parentXY = [distX < 0 ? position.x + halfwidth : position.x, position.y + offsetY];
    /** @type {Array} */
    var j = [parentXY[0] + y / 2, position.y];
    /** @type {Array} */
    var origin = [j[0], 2 * parentXY[1] - j[1]];
    /** @type {Array} */
    var l = [parentXY[0] + y, parentXY[1]];
    /** @type {Array} */
    var yRange = [distX < 0 ? position.x + position.w - halfwidth : position.x + position.w, 2 * ts - parentXY[1]];
    /** @type {Array} */
    var n = [yRange[0] - y / 2, position.y + position.h];
    /** @type {Array} */
    var o = [n[0], 2 * ts - origin[1]];
    /** @type {Array} */
    var p = [yRange[0] - y, 2 * ts - parentXY[1]];
    /** @type {Array} */
    var b = ["M", parentXY[0], parentXY[1], "C", j[0], j[1], origin[0], origin[1], l[0], l[1], "L", yRange[0], yRange[1], "C", n[0], n[1], o[0], o[1], p[0], p[1], "Z"];
    return b;
  };
  /**
   * @param {Object} self
   * @return {?}
   */
  var link = function(self) {
    var events = self.ex = self.ex || [{
      dx : self.w / 2,
      dy : self.h + 10
    }, {
      dx : -10,
      dy : self.h / 4
    }];
    var x = events[0].dx;
    var y = events[1].dy;
    var ts = self.y + self.h / 2;
    /** @type {number} */
    var distX = x - self.w / 2;
    /** @type {number} */
    var margin = 2 * Math.abs(distX);
    /** @type {number} */
    var width = self.w - margin;
    /** @type {Array} */
    var datum = [distX < 0 ? self.x + margin : self.x, self.y + y];
    /** @type {Array} */
    var j = [datum[0] + width / 4, self.y];
    /** @type {Array} */
    var origin = [j[0], 2 * datum[1] - j[1]];
    /** @type {Array} */
    var l = [datum[0] + width / 2, datum[1]];
    /** @type {Array} */
    var m = [datum[0] + 3 * width / 4, self.y];
    /** @type {Array} */
    var n = [m[0], 2 * datum[1] - j[1]];
    /** @type {Array} */
    var o = [datum[0] + width, datum[1]];
    /** @type {Array} */
    var pos = [distX < 0 ? self.x + self.w - margin : self.x + self.w, 2 * ts - datum[1]];
    /** @type {Array} */
    var q = [pos[0] - width / 4, self.y + self.h];
    /** @type {Array} */
    var r = [q[0], 2 * ts - n[1]];
    /** @type {Array} */
    var s = [pos[0] - width / 2, pos[1]];
    /** @type {Array} */
    var t = [pos[0] - 3 * width / 4, self.y + self.h];
    /** @type {Array} */
    var u = [t[0], 2 * ts - origin[1]];
    /** @type {Array} */
    var v = [pos[0] - width, 2 * ts - datum[1]];
    /** @type {Array} */
    var result = ["M", datum[0], datum[1], "C", j[0], j[1], origin[0], origin[1], l[0], l[1], "C", m[0], m[1], n[0], n[1], o[0], o[1], "L", pos[0], pos[1], "C", q[0], q[1], r[0], r[1], s[0], s[1], "C", t[0], t[1], u[0], u[1], v[0], v[1], "Z"];
    return result;
  };
  /**
   * @param {Object} pos
   * @return {?}
   */
  var render = function(pos) {
    var options = pos.ex = pos.ex || {
      dx : 0,
      dy : Math.min(pos.w, pos.h) / 4
    };
    var width = options.dy;
    /** @type {Array} */
    var d = [pos.x + 2 * width, pos.y + width / 2];
    /** @type {Array} */
    var newCenter = [pos.x + 3 * width / 2, d[1]];
    /** @type {Array} */
    var f = [newCenter[0] - width / 4, newCenter[1]];
    /** @type {Array} */
    var g = [f[0], newCenter[1] + width / 2];
    /** @type {Array} */
    var i = [newCenter[0], g[1]];
    /** @type {Array} */
    var j = [d[0], i[1]];
    /** @type {Array} */
    var k = [d[0], pos.y];
    /** @type {Array} */
    var l = [newCenter[0], pos.y];
    /** @type {Array} */
    var m = [pos.x + width, pos.y];
    /** @type {Array} */
    var n = [m[0], pos.y + width / 2];
    /** @type {Array} */
    var o = [m[0], pos.y + pos.h - width / 2];
    /** @type {Array} */
    var p = [o[0], pos.y + pos.h];
    /** @type {Array} */
    var q = [pos.x, pos.y + pos.h - width];
    /** @type {Array} */
    var r = [pos.x + width / 2, q[1]];
    /** @type {Array} */
    var s = [pos.x + 3 * width / 4, r[1]];
    /** @type {Array} */
    var t = [s[0], o[1]];
    /** @type {Array} */
    var u = [r[0], t[1]];
    /** @type {Array} */
    var v = [pos.x + width / 2, pos.y + pos.h];
    /** @type {Array} */
    var w = [pos.x + pos.w - 3 * width / 2, pos.y + pos.h];
    /** @type {Array} */
    var x = [pos.x + pos.w - width, pos.y + pos.h];
    /** @type {Array} */
    var y = [x[0], pos.y + pos.h - width / 2];
    /** @type {Array} */
    var z = [y[0], i[1]];
    /** @type {Array} */
    var A = [z[0] + width / 2, z[1]];
    /** @type {Array} */
    var B = [pos.x + pos.w, A[1]];
    /** @type {Array} */
    var C = [pos.x + pos.w, pos.y];
    /** @type {Array} */
    var D = [pos.x + pos.w - width / 2, pos.y];
    /** @type {Array} */
    var beginswith = ["M", l[0], l[1], "Q", m[0], m[1], n[0], n[1], "L", o[0], o[1], "Q", p[0], p[1], v[0], v[1], "L", w[0], w[1], "Q", x[0], x[1], y[0], y[1], "L", z[0], z[1], "L", A[0], A[1], "C", B[0], B[1], C[0], C[1], D[0], D[1], "L", l[0], l[1], "Q", k[0], k[1], d[0], d[1], "Q", j[0], j[1], i[0], i[1], "L", z[0], z[1], "M", o[0], o[1], "L", u[0], u[1], "C", t[0], t[1], s[0], s[1], r[0], r[1], "L", o[0], r[1]];
    var caseSensitive = parseCommand(pos);
    return[beginswith.concat(caseSensitive), caseSensitive];
  };
  /**
   * @param {Object} pos
   * @return {?}
   */
  var parseCommand = function(pos) {
    var width = pos.ex.dy;
    /** @type {Array} */
    var c = [pos.x + 2 * width, pos.y + width / 2];
    /** @type {Array} */
    var newCenter = [pos.x + 3 * width / 2, c[1]];
    /** @type {Array} */
    var e = [newCenter[0] - width / 4, newCenter[1]];
    /** @type {Array} */
    var f = [e[0], newCenter[1] + width / 2];
    /** @type {Array} */
    var g = [newCenter[0], f[1]];
    /** @type {Array} */
    var h = [c[0], g[1]];
    /** @type {Array} */
    var i = [pos.x + width, pos.y + pos.h - width / 2];
    /** @type {Array} */
    var j = [i[0], pos.y + pos.h];
    /** @type {Array} */
    var k = [pos.x, pos.y + pos.h - width];
    /** @type {Array} */
    var l = [pos.x + width / 2, k[1]];
    /** @type {Array} */
    var m = [pos.x + 3 * width / 4, l[1]];
    /** @type {Array} */
    var n = [m[0], i[1]];
    /** @type {Array} */
    var o = [l[0], n[1]];
    /** @type {Array} */
    var p = [pos.x + width / 2, pos.y + pos.h];
    /** @type {Array} */
    var arr = ["M", i[0], i[1], "Q", j[0], j[1], p[0], p[1], "C", k[0], p[1], k[0], k[1], l[0], l[1], "C", m[0], m[1], n[0], n[1], o[0], o[1], "L", i[0], i[1], "M", c[0], c[1], "L", newCenter[0], newCenter[1], "C", e[0], e[1], f[0], f[1], g[0], g[1], "Q", h[0], h[1], c[0], c[1]];
    return arr;
  };
  /**
   * @param {Object} params
   * @return {?}
   */
  var update = function(params) {
    params.ex = params.ex || {
      dx : Math.min(params.w, params.h) / 4,
      dy : 0
    };
    var tmp = params.x;
    var offset = params.y;
    var app = params.w;
    var height = params.h;
    /** @type {number} */
    var h = params.ex.dx;
    /** @type {Array} */
    var g = [tmp + h / 2, offset + 2 * h];
    /** @type {Array} */
    var p1 = [g[0], offset + 3 * h / 2];
    /** @type {Array} */
    var i = [p1[0], p1[1] - h / 4];
    /** @type {Array} */
    var k = [p1[0] + h / 2, i[1]];
    /** @type {Array} */
    var l = [k[0], p1[1]];
    /** @type {Array} */
    var m = [l[0], g[1]];
    /** @type {Array} */
    var cols = [tmp, g[1]];
    /** @type {Array} */
    var tmpFiles = [tmp, p1[1]];
    /** @type {Array} */
    var p = [tmp, offset + h];
    /** @type {Array} */
    var q = [tmp + h / 2, p[1]];
    /** @type {Array} */
    var r = [tmp + app - h / 2, p[1]];
    /** @type {Array} */
    var s = [tmp + app, r[1]];
    /** @type {Array} */
    var offsets = [tmp + app - h, offset];
    /** @type {Array} */
    var u = [offsets[0], offset + h / 2];
    /** @type {Array} */
    var v = [u[0], offset + 3 * h / 4];
    /** @type {Array} */
    var w = [r[0], v[1]];
    /** @type {Array} */
    var x = [w[0], u[1]];
    /** @type {Array} */
    var y = [tmp + app, offset + h / 2];
    /** @type {Array} */
    var z = [tmp + app, offset + height - 3 * h / 2];
    /** @type {Array} */
    var A = [tmp + app, offset + height - h];
    /** @type {Array} */
    var B = [tmp + app - h / 2, A[1]];
    /** @type {Array} */
    var C = [l[0], B[1]];
    /** @type {Array} */
    var D = [C[0], C[1] + h / 2];
    /** @type {Array} */
    var E = [D[0], offset + height];
    /** @type {Array} */
    var F = [tmp, offset + height];
    /** @type {Array} */
    var G = [tmp, offset + height - h / 2];
    /** @type {Array} */
    var beginswith = ["M", tmpFiles[0], tmpFiles[1], "Q", p[0], p[1], q[0], q[1], "L", r[0], r[1], "Q", s[0], s[1], y[0], y[1], "L", z[0], z[1], "Q", A[0], A[1], B[0], B[1], "L", C[0], C[1], "L", D[0], D[1], "C", E[0], E[1], F[0], F[1], G[0], G[1], "L", tmpFiles[0], tmpFiles[1], "Q", cols[0], cols[1], g[0], g[1], "Q", m[0], m[1], l[0], l[1], "L", C[0], C[1], "M", r[0], r[1], "L", x[0], x[1], "C", w[0], w[1], v[0], v[1], u[0], u[1], "L", u[0], r[1]];
    var caseSensitive = lerp(params);
    return[beginswith.concat(caseSensitive), caseSensitive];
  };
  /**
   * @param {Object} a
   * @return {?}
   */
  var lerp = function(a) {
    var x = a.x;
    var y = a.y;
    var width = a.w;
    var height = a.ex.dx;
    /** @type {Array} */
    var f = [x + height / 2, y + 2 * height];
    /** @type {Array} */
    var newCenter = [f[0], y + 3 * height / 2];
    /** @type {Array} */
    var h = [newCenter[0], newCenter[1] - height / 4];
    /** @type {Array} */
    var i = [newCenter[0] + height / 2, h[1]];
    /** @type {Array} */
    var j = [i[0], newCenter[1]];
    /** @type {Array} */
    var k = [j[0], f[1]];
    /** @type {Array} */
    var l = [x + width - height / 2, y + height];
    /** @type {Array} */
    var m = [x + width, l[1]];
    /** @type {Array} */
    var dirs = [x + width - height, y];
    /** @type {Array} */
    var o = [dirs[0], y + height / 2];
    /** @type {Array} */
    var p = [o[0], y + 3 * height / 4];
    /** @type {Array} */
    var q = [l[0], p[1]];
    /** @type {Array} */
    var r = [q[0], o[1]];
    /** @type {Array} */
    var s = [x + width, y + height / 2];
    /** @type {Array} */
    var dest = ["M", l[0], l[1], "Q", m[0], m[1], s[0], s[1], "C", s[0], dirs[1], dirs[0], dirs[1], o[0], o[1], "C", p[0], p[1], q[0], q[1], r[0], r[1], "L", l[0], l[1], "M", f[0], f[1], "L", newCenter[0], newCenter[1], "C", h[0], h[1], i[0], i[1], j[0], j[1], "Q", k[0], k[1], f[0], f[1]];
    return dest;
  };
  /**
   * @param {Object} node
   * @return {?}
   */
  var move = function(node) {
    node.ex = node.ex || [{
      dx : node.w / 4,
      dy : -10
    }, {
      dx : node.w / 2,
      dy : 3 * node.h / 4
    }];
    var offsetLeft = node.x;
    var r = node.y;
    var textWidth = node.w;
    var height = node.h;
    var width = node.ex[0].dx;
    var g = node.ex[1].dy;
    var ts = offsetLeft + textWidth / 2;
    /** @type {number} */
    var b = (height - g) / 4;
    /** @type {Array} */
    var cache = [offsetLeft + width + textWidth / 8, r + g + 3 * b];
    /** @type {Array} */
    var k = [2 * ts - cache[0], cache[1]];
    /** @type {Array} */
    var m = [cache[0], r + height];
    /** @type {Array} */
    var n = [cache[0] - b, m[1]];
    /** @type {Array} */
    var o = [offsetLeft, m[1]];
    /** @type {Array} */
    var p = [offsetLeft + textWidth / 8, r + height - g / 2];
    /** @type {Array} */
    var start = [offsetLeft, r + height - g];
    /** @type {Array} */
    var d = [offsetLeft + width, start[1]];
    /** @type {Array} */
    var s = [d[0], r + b];
    /** @type {Array} */
    var horizontal = [d[0], r];
    /** @type {Array} */
    var sides = [d[0] + b, r];
    /** @type {Array} */
    var v = [2 * ts - sides[0], r];
    /** @type {Array} */
    var w = [2 * ts - horizontal[0], r];
    /** @type {Array} */
    var x = [2 * ts - s[0], s[1]];
    /** @type {Array} */
    var y = [2 * ts - d[0], d[1]];
    /** @type {Array} */
    var z = [2 * ts - start[0], start[1]];
    /** @type {Array} */
    var A = [2 * ts - p[0], p[1]];
    /** @type {Array} */
    var B = [2 * ts - o[0], o[1]];
    /** @type {Array} */
    var C = [2 * ts - n[0], n[1]];
    /** @type {Array} */
    var D = [2 * ts - m[0], m[1]];
    /** @type {Array} */
    var origin = [offsetLeft + width, r + g + b];
    /** @type {Array} */
    var F = [2 * ts - origin[0], origin[1]];
    /** @type {Array} */
    var G = [k[0], r + g];
    /** @type {Array} */
    var H = [2 * ts - k[0], r + g];
    /** @type {Array} */
    var arr = ["M", cache[0], cache[1], "Q", m[0], m[1], n[0], n[1], "L", o[0], o[1], "L", p[0], p[1], "L", start[0], start[1], "L", d[0], d[1], "L", s[0], s[1], "Q", horizontal[0], horizontal[1], sides[0], sides[1], "L", v[0], v[1], "Q", w[0], w[1], x[0], x[1], "L", y[0], y[1], "L", z[0], z[1], "L", A[0], A[1], "L", B[0], B[1], "L", C[0], C[1], "Q", D[0], D[1], k[0], k[1], "L", G[0], G[1], "L", H[0], H[1], "M", origin[0], origin[1], "L", s[0], s[1], "M", F[0], F[1], "L", x[0], x[1]];
    var h = center(node);
    return arr = h.concat(arr), [arr, h];
  };
  /**
   * @param {Object} pos
   * @return {?}
   */
  var center = function(pos) {
    var dx = pos.ex[0].dx;
    var y = pos.ex[1].dy;
    var ts = pos.x + pos.w / 2;
    /** @type {Array} */
    var c = [pos.x + dx + pos.w / 8, pos.y + y];
    /** @type {number} */
    var dy = (pos.h - y) / 4;
    /** @type {Array} */
    var g = [pos.x + dx + dy, c[1]];
    /** @type {Array} */
    var h = [pos.x + dx, c[1]];
    /** @type {Array} */
    var origin = [pos.x + dx, c[1] + dy];
    /** @type {Array} */
    var j = [pos.x + dx, c[1] + 2 * dy];
    /** @type {Array} */
    var point = [pos.x + dx + dy, c[1] + 2 * dy];
    /** @type {Array} */
    var l = [c[0] - dy, point[1]];
    /** @type {Array} */
    var m = [c[0], point[1]];
    /** @type {Array} */
    var n = [c[0], point[1] + dy];
    /** @type {Array} */
    var o = [2 * ts - c[0], c[1]];
    /** @type {Array} */
    var p = [2 * ts - g[0], g[1]];
    /** @type {Array} */
    var q = [2 * ts - h[0], h[1]];
    /** @type {Array} */
    var r = [2 * ts - origin[0], origin[1]];
    /** @type {Array} */
    var s = [2 * ts - j[0], j[1]];
    /** @type {Array} */
    var t = [2 * ts - point[0], point[1]];
    /** @type {Array} */
    var u = [2 * ts - l[0], l[1]];
    /** @type {Array} */
    var v = [2 * ts - m[0], m[1]];
    /** @type {Array} */
    var w = [2 * ts - n[0], n[1]];
    /** @type {Array} */
    var arr = ["M", c[0], c[1], "L", g[0], g[1], "Q", h[0], h[1], origin[0], origin[1], "Q", j[0], j[1], point[0], point[1], "L", l[0], l[1], "Q", m[0], m[1], n[0], n[1], "L", c[0], c[1], "L", o[0], o[1], "L", p[0], p[1], "Q", q[0], q[1], r[0], r[1], "Q", s[0], s[1], t[0], t[1], "L", u[0], u[1], "Q", v[0], v[1], w[0], w[1], "L", o[0], o[1]];
    return arr;
  };
  /**
   * @param {Object} sprite
   * @return {?}
   */
  var start = function(sprite) {
    return sprite.initRotate = Math.PI, move(sprite);
  };
  /**
   * @param {Object} o
   * @return {?}
   */
  var processPath = function(o) {
    var events = o.ex = o.ex || [{
      dx : 0,
      dy : o.h / 4
    }, {
      dx : o.w / 4,
      dy : 0
    }, {
      dx : o.w / 2,
      dy : 3 * o.h / 5
    }];
    var position = o.x;
    var t = o.y;
    var value = o.w;
    var h = o.h;
    /** @type {number} */
    var count = value / 2;
    var text = position + count;
    /** @type {number} */
    var y = h * (1 - 3 * events[2].dy / (2 * h));
    if (events[2].dy > 2 * h / 3) {
      y = events[2].dy >= h ? 0 : events[2].dy > h - events[0].dy ? h - events[2].dy : events[0].dy;
    }
    events[0].dy = y;
    var finalPosition = position;
    var b = t + y;
    var tval = position + value;
    var oldb = b;
    var raw = text;
    /** @type {number} */
    var diff = t - y;
    var xy = util.bezier([finalPosition, b, raw, diff, tval, oldb], events[1].dx / value);
    var dy = util.bezier([finalPosition, b, position + value / 4, t, text, t], 2 * (events[1].dx + value / 8) / value);
    var s = util.bezier([finalPosition, b, raw, diff, tval, oldb], 1 / 8);
    /** @type {Array} */
    var arr = ["M", xy[0], xy[1], "Q", raw, 2 * t - xy[1], 2 * text - xy[0], xy[1], "L", 2 * text - xy[0], xy[1] + events[2].dy, "Q", raw, 2 * t - xy[1] + events[2].dy, xy[0], xy[1] + events[2].dy, "Z", "M", dy[0], dy[1] + events[2].dy, "L", dy[0], dy[1] + (h - y), "L", xy[0], xy[1] + events[2].dy, "M", dy[0], dy[1] + (h - y), "Q", position + value / 4, t + (h - y), position, t + h, "L", s[0], s[1] + events[2].dy, "L", position, t + h - events[2].dy, "Q", position + value / 4, t + (h - y) - events[2].dy, 
    xy[0], xy[1] + h - y - events[2].dy, "M", 2 * text - xy[0], xy[1] + h - y - events[2].dy, "Q", position + 3 * value / 4, t + (h - y) - events[2].dy, position + value, t + h - events[2].dy, "L", 2 * text - s[0], s[1] + events[2].dy, "L", position + value, t + h, "Q", position + 3 * value / 4, t + (h - y), 2 * text - dy[0], dy[1] + (h - y), "L", 2 * text - dy[0], dy[1] + events[2].dy, "M", 2 * text - dy[0], dy[1] + (h - y), "L", 2 * text - xy[0], xy[1] + events[2].dy];
    return[arr, ["M", dy[0], dy[1] + events[2].dy, "L", dy[0], dy[1] + (h - y), "L", xy[0], xy[1] + events[2].dy, "Q", raw, 2 * t - xy[1] + events[2].dy, 2 * text - xy[0], xy[1] + events[2].dy, "L", 2 * text - dy[0], dy[1] + (h - y), "L", 2 * text - dy[0], dy[1] + events[2].dy]];
  };
  /**
   * @param {Object} e
   * @return {?}
   */
  var handleInput = function(e) {
    return e.initRotate = Math.PI, processPath(e);
  };
  return{
    /** @type {function (Object): ?} */
    explosion : init,
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star3 : function(totalSize) {
      return kb(totalSize, 3, -Math.PI / 2);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star4 : function(totalSize) {
      return kb(totalSize, 4);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star5 : function(totalSize) {
      return kb(totalSize, 5, -Math.PI / 2);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star6 : function(totalSize) {
      return kb(totalSize, 6, -Math.PI / 2);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star7 : function(totalSize) {
      return kb(totalSize, 7, -Math.PI / 2);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star8 : function(totalSize) {
      return kb(totalSize, 8);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star10 : function(totalSize) {
      return kb(totalSize, 10);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star12 : function(totalSize) {
      return kb(totalSize, 12);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star16 : function(totalSize) {
      return kb(totalSize, 16);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star24 : function(totalSize) {
      return kb(totalSize, 24);
    },
    /**
     * @param {Object} totalSize
     * @return {?}
     */
    star32 : function(totalSize) {
      return kb(totalSize, 32);
    },
    /** @type {function (Object): ?} */
    wave : bounds,
    /** @type {function (Object): ?} */
    wave2 : link,
    /** @type {function (Object): ?} */
    vscroll : render,
    /** @type {function (Object): ?} */
    hscroll : update,
    /** @type {function (Object): ?} */
    uribbon : move,
    /** @type {function (Object): ?} */
    dribbon : start,
    /** @type {function (Object): ?} */
    curveduribbon : processPath,
    /** @type {function (Object): ?} */
    curveddribbon : handleInput
  };
});

!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jh2d"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jh2d"));
    } else {
      var global = dataAndEvents.jh2d = dataAndEvents.jh2d || {};
      global.event = factory(global);
    }
  }
}(this, function(win) {
  /**
   * @param {Object} el
   * @param {Object} data
   * @return {undefined}
   */
  function fn(el, data) {
    var o = el.text;
    var text = data.text;
    if (text) {
      if ("object" == typeof data.text) {
        if ("string" == typeof o) {
          o = {
            text : o
          };
        }
        if ("object" == typeof o) {
          $.extend(data.text, o);
        }
      } else {
        if ("string" == typeof data.text) {
          if ("object" == typeof o) {
            data.text = $.extend({
              text : data.text
            }, o);
          }
        }
      }
    }
    $.extend(el, data, true);
    if (data.x || (data.w || (data.y || data.h))) {
      delete el.d;
    }
    data.text = text;
  }
  var $ = win.util;
  /**
   * @param {Object} data
   * @param {Object} e
   * @return {?}
   */
  var id = function(data, e) {
    return e.id || "_jh_" + e.type + "_" + data.seq++;
  };
  /**
   * @param {Object} o
   * @return {undefined}
   */
  var Node = function(o) {
    o.o = $.extend(o.o || {}, {
      seq : 0
    });
    this._c = new Box(this, o.c);
    this._g = listen(this);
    this.data(o);
    this._s = new Model(this, o.s);
  };
  Node.prototype = {
    /**
     * @param {Object} data
     * @return {?}
     */
    gen : function(data) {
      var geometry = this._m;
      return data.id = id(geometry, data), data;
    },
    /**
     * @param {?} a
     * @return {undefined}
     */
    add : function(a) {
      var self = this;
      var args = self._d;
      if ($.isArray(a)) {
        $.each(a, function(user) {
          args[args.length] = self.gen(user);
        });
      } else {
        if (a) {
          args[args.length] = this.gen(a);
        }
      }
    },
    /**
     * @param {number} name
     * @return {?}
     */
    get : function(name) {
      return $.getArray(this._d, name);
    },
    /**
     * @param {string} obj
     * @return {?}
     */
    data : function(obj) {
      var self = this;
      return "undefined" == typeof obj ? {
        d : this._d,
        o : this._m,
        g : this._g.data()
      } : (this._m = obj.o, this._d = obj.d || [], $.each(this._d, function(user) {
        if (!user.id) {
          self.gen(user);
        }
      }), obj.g && this._g.data(obj.g), void 0);
    },
    /**
     * @param {?} id
     * @return {?}
     */
    id : function(id) {
      var cookieName = this.indexById(id);
      return this.get(cookieName);
    },
    /**
     * @param {Object} recurring
     * @param {boolean} fn
     * @return {undefined}
     */
    update : function(recurring, fn) {
      var data = this._d;
      var collection = this;
      $.each(recurring, function(item) {
        var i = collection.indexById(item.id);
        if (i !== -1) {
          if ("function" == typeof fn) {
            fn(item, data[i]);
          }
          $.extend(data[i], item, true);
          delete data[i].d;
        }
      });
    },
    /**
     * @param {?} object
     * @param {?} fn
     * @return {?}
     */
    indexOf : function(object, fn) {
      var which = this._d;
      /** @type {number} */
      var text = -1;
      return $.each(which, function(self, textAlt) {
        if ("function" == typeof fn && fn(self)) {
          return false;
        }
        if (!self.locked) {
          var item = $.spRotate(self, object, -1, true);
          var parent = self.d;
          /** @type {boolean} */
          var acc = false;
          return parent && ($.isArray(parent) ? ($.isArray(parent[0]) && (parent = parent[0]), ("line" === self.type || ($.inRect(self, item) || self.ex)) && (acc = 0 !== $.evalSVGPath(parent, item))) : acc = $.inRect(self, item)), acc && (text = textAlt), acc;
        }
      }, true), text;
    },
    /**
     * @param {Array} key
     * @param {Array} protoProps
     * @return {?}
     */
    indexsOf : function(key, protoProps) {
      var evt = this;
      var which = evt._d;
      var parent = evt._g;
      /** @type {Array} */
      var ancestors = [];
      var child = $.maxRect(key, protoProps);
      var propertiesJson = {};
      return $.each(which, function(p, dataAndEvents) {
        if (!p.locked) {
          if (p.grpId) {
            var elem = parent.indexById(p.grpId);
            if (elem !== -1 && !propertiesJson[p.grpId]) {
              var self = parent.get(elem);
              /** @type {boolean} */
              propertiesJson[self.id] = true;
              if ($.insideRect(child, self._g)) {
                $.each(self.childIds(), function(node) {
                  ancestors[ancestors.length] = evt.indexById(node);
                });
              }
            }
          } else {
            if ($.insideRect(child, p)) {
              ancestors[ancestors.length] = dataAndEvents;
            }
          }
        }
      }), ancestors;
    },
    /**
     * @param {?} node
     * @return {?}
     */
    indexById : function(node) {
      var which = this._d;
      /** @type {number} */
      var text = -1;
      return $.each(which, function(d, textAlt) {
        /** @type {boolean} */
        var expectedAChild = d.id === node;
        return expectedAChild && (text = textAlt), expectedAChild;
      }), text;
    },
    /**
     * @param {number} array
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    arrange : function(array, expectedNumberOfNonCommentArgs) {
      var self = this;
      var stack = self._d;
      var items = self._g;
      switch($.each(array, function(el) {
        var index = self.indexById(el.id);
        switch(expectedNumberOfNonCommentArgs) {
          case 3:
            if (index < stack.length - 1) {
              $.arrExch(stack, index, index + 1);
            }
            break;
          case 4:
            if (index > 0) {
              $.arrExch(stack, index - 1, index);
            }
            break;
          case 0:
            if (el.grpId) {
              items.removeById(el.grpId);
            }
            stack.splice(index, 1);
            break;
          case 1:
          ;
          case 2:
            stack.splice(index, 1);
        }
      }), expectedNumberOfNonCommentArgs) {
        case 1:
          this._d = stack.concat(array);
          break;
        case 2:
          this._d = array.concat(stack);
      }
      return this;
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    remove : function(expectedNumberOfNonCommentArgs) {
      return this.arrange(expectedNumberOfNonCommentArgs, 0);
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    arrangeFirst : function(expectedNumberOfNonCommentArgs) {
      return this.arrange(expectedNumberOfNonCommentArgs, 2);
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    arrangeLast : function(expectedNumberOfNonCommentArgs) {
      return this.arrange(expectedNumberOfNonCommentArgs, 1);
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    arrangeForward : function(expectedNumberOfNonCommentArgs) {
      return this.arrange(expectedNumberOfNonCommentArgs, 3);
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    arrangeBackward : function(expectedNumberOfNonCommentArgs) {
      return this.arrange(expectedNumberOfNonCommentArgs, 4);
    }
  };
  /**
   * @param {?} result
   * @param {Object} opts
   * @return {undefined}
   */
  var loop = function(result, opts) {
    this._d = result;
    this._g = $.extend(opts || {}, {
      type : "__grp",
      fillStyle : "#fff",
      lw : 0.25
    });
    if (void 0 === this._g.id) {
      result.gen(this._g);
    }
    if (!opts.x) {
      this.update();
    }
  };
  loop.prototype = {
    /**
     * @return {undefined}
     */
    update : function() {
      /** @type {number} */
      var right = 0;
      /** @type {number} */
      var bottom = 0;
      /** @type {number} */
      var width = 0;
      /** @type {number} */
      var top = 0;
      var self = this;
      /** @type {number} */
      var r = 0;
      $.each(self._g.children, function(data, dataAndEvents) {
        if ("string" == typeof data) {
          data = self._d.id(data);
        }
        data.grpId = self._g.id;
        var px = data.dx || 0;
        var offsetY = data.dy || 0;
        var x = data.x + px;
        var y = data.y + offsetY;
        var height = data.w;
        var len = data.h;
        if (0 === dataAndEvents) {
          /** @type {number} */
          right = Math.min(x, x + height);
          /** @type {number} */
          bottom = Math.min(y, y + len);
          /** @type {number} */
          width = Math.max(x, x + height);
          /** @type {number} */
          top = Math.max(y, y + len);
        } else {
          /** @type {number} */
          right = Math.min(x, right, x + height);
          /** @type {number} */
          bottom = Math.min(y, bottom, y + len);
          /** @type {number} */
          width = Math.max(x, width, x + height);
          /** @type {number} */
          top = Math.max(y, top, y + len);
        }
      });
      $.extend(self._g, {
        x : right - r,
        y : bottom - r,
        w : width - right + 2 * r,
        h : top - bottom + 2 * r
      }, true);
      delete self._g.d;
    },
    /**
     * @return {?}
     */
    childIds : function() {
      var config = this;
      var channel = config._d;
      var which = config._g.children;
      /** @type {Array} */
      var r = [];
      return $.each(which, function(item) {
        if ("__grp" === item.type) {
          r = r.concat((new loop(channel, item)).childIds());
        } else {
          /** @type {Event} */
          r[r.length] = item;
        }
      }), r;
    },
    /**
     * @param {?} value
     * @return {?}
     */
    isDeepId : function(value) {
      var config = this;
      var which = config._g.children;
      /** @type {boolean} */
      var e = false;
      return $.each(which, function(filter) {
        if ("__grp" === filter.type) {
          return e = (new loop(config._d, filter)).isDeepId(value) || filter.id === value;
        }
      }), e;
    },
    /**
     * @return {?}
     */
    ungroup : function() {
      var self = this;
      var which = self._g.children;
      /** @type {Array} */
      var memo = [];
      return $.each(which, function(el) {
        if ("string" == typeof el) {
          el = self._d.id(el);
        } else {
          memo[memo.length] = el;
        }
        delete el.grpId;
      }), memo;
    },
    /**
     * @param {Function} callback
     * @return {undefined}
     */
    loop : function(callback) {
      var config = this;
      var which = config._g.children;
      $.each(which, function(el) {
        /** @type {null} */
        var self = null;
        if ("string" == typeof el) {
          el = config._d.id(el);
        }
        if ("__grp" === el.type) {
          self = new loop(config._d, el);
          self.loop(callback);
        }
        callback(el, self);
      });
    },
    /**
     * @param {boolean} f
     * @return {undefined}
     */
    lock : function(f) {
      var disabled = void 0 === f || f;
      this.loop(function(data) {
        data.locked = disabled;
      });
    }
  };
  /**
   * @param {string} opt_eventHandler
   * @return {?}
   */
  var listen = function(opt_eventHandler) {
    /** @type {Array} */
    var deps = [];
    /**
     * @param {Function} s
     * @return {?}
     */
    var destroy = function(s) {
      /** @type {null} */
      var depMap = null;
      /** @type {Array} */
      var data = [];
      /** @type {Array} */
      var files = [];
      return $.each(s, function(result) {
        if (result.grpId) {
          if (files[result.grpId]) {
            return;
          }
          /** @type {boolean} */
          files[result.grpId] = true;
          data = data.concat(deps.splice(resolve(result.grpId), 1));
        } else {
          data[data.length] = result.id;
        }
      }), data.length > 1 && (depMap = new loop(opt_eventHandler, {
        children : data
      }), deps[deps.length] = depMap._g), depMap;
    };
    /**
     * @param {Function} obj1
     * @return {undefined}
     */
    var update = function(obj1) {
      /** @type {Array} */
      var c = [];
      /** @type {Array} */
      var $cookies = [];
      /** @type {null} */
      var key = null;
      /** @type {Array} */
      var cache = [];
      $.each(obj1, function(err) {
        if (err.grpId) {
          if (key = cb(err.grpId), $cookies[key]) {
            return;
          }
          /** @type {boolean} */
          $cookies[key] = true;
          var value = resolve(key);
          c[c.length] = value;
        }
      });
      if (c.length > 0) {
        $.each(deps, function(v, nodes) {
          var pos = $.inArray(c, nodes);
          if (pos === -1) {
            /** @type {Function} */
            cache[cache.length] = v;
          } else {
            cache = cache.concat((new loop(opt_eventHandler, v)).ungroup());
            c.splice(pos, 1);
          }
        });
        deps = cache;
      }
    };
    /**
     * @param {number} name
     * @return {?}
     */
    var getData = function(name) {
      var err = $.getArray(deps, name);
      return "number" == typeof name && (err = new loop(opt_eventHandler, err)), err;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    var resolve = function(id) {
      /** @type {number} */
      var text = -1;
      return $.each(deps, function(psurface, textAlt) {
        if (psurface.id === cb(id)) {
          return text = textAlt, true;
        }
      }), text;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    var cb = function(value) {
      /** @type {null} */
      var index = null;
      return $.each(deps, function(s) {
        if (s.id === value) {
          return index = s.id, true;
        }
      }), null == index && (index = value, $.each(deps, function(s) {
        if ((new loop(opt_eventHandler, s)).isDeepId(value)) {
          return index = s.id, true;
        }
      })), index;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    var callback = function(id) {
      return deps[resolve(id)];
    };
    /**
     * @param {?} id
     * @return {undefined}
     */
    var remove = function(id) {
      var m = resolve(id);
      if (m !== -1) {
        deps.splice(m, 1);
      }
    };
    return{
      /** @type {function (Function): ?} */
      group : destroy,
      /** @type {function (Function): undefined} */
      ungroup : update,
      /** @type {function (number): ?} */
      get : getData,
      /**
       * @param {string} name
       * @return {?}
       */
      data : function(name) {
        return "undefined" == typeof name ? getData() : void(deps = name);
      },
      /** @type {function (?): ?} */
      indexById : resolve,
      /** @type {function (?): ?} */
      rootId : cb,
      /** @type {function (?): ?} */
      id : callback,
      /** @type {function (?): undefined} */
      removeById : remove
    };
  };
  /**
   * @param {?} opt_options
   * @param {?} bounds
   * @return {undefined}
   */
  var Box = function(opt_options, bounds) {
    this._d = opt_options;
    this._conn = bounds || {};
  };
  Box.prototype = {
    /**
     * @param {Array} args
     * @param {?} val
     * @return {undefined}
     */
    doSelectedSprite : function(args, val) {
      var params = this._d;
      var pageX = args[0];
      var handler = args[1];
      var id = args[2];
      var pageY = args[3];
      /** @type {null} */
      var index = null;
      /** @type {null} */
      var child = null;
      if (!(pageX === -1)) {
        if (!pageY) {
          if (!!this.isConnector(child = params.id(id))) {
            if (!(1 !== pageX)) {
              if (!(6 !== handler && 9 !== handler)) {
                index = this.indexOf(child, val);
                this.doOverSprite(index);
              }
            }
          }
        }
      }
    },
    /**
     * @param {Object} s
     * @return {?}
     */
    isConnector : function(s) {
      return $.isConnector(s);
    },
    /**
     * @param {Object} q
     * @return {?}
     */
    connected : function(q) {
      /** @type {number} */
      var _bitBuffer = 0;
      var data = this._conn;
      return this.isConnector(q) ? (_bitBuffer = 1, data[q.id] && (_bitBuffer = 2 | _bitBuffer)) : this.find(q, function() {
        return _bitBuffer = 2, true;
      }), _bitBuffer;
    },
    /**
     * @param {Object} item
     * @return {?}
     */
    connectType : function(item) {
      var results = this._conn;
      /** @type {number} */
      var prev = 0;
      /** @type {number} */
      var curr = 0;
      return results[item.id] && (prev = results[item.id].sid ? 1 : 0, curr = results[item.id].eid ? 2 : 0), prev | curr;
    },
    /**
     * @param {?} object
     * @param {?} child
     * @return {?}
     */
    indexOf : function(object, child) {
      var parent = this._d;
      var item = function(b) {
        return function(a) {
          return a.id === b.id;
        };
      }(object);
      return parent.indexOf(child, item);
    },
    /**
     * @param {Object} o
     * @param {number} details
     * @param {number} name
     * @return {undefined}
     */
    connect : function(o, details, name) {
      var sum = o.x + (o.dx || 0);
      var spaceBefore = o.y + (o.dy || 0);
      var x = o.w;
      var content = o.h;
      /** @type {null} */
      var start = null;
      var $templateCache = this._d;
      /** @type {null} */
      var value = null;
      /** @type {null} */
      var field = null;
      /** @type {null} */
      var val = null;
      details = details || 3;
      if (1 === (1 & details)) {
        /** @type {Array} */
        start = [sum, spaceBefore];
        if (void 0 === name) {
          name = this.indexOf(o, start);
        }
        if (name !== -1) {
          field = $templateCache.get(name);
          value = $.evalConnPoint(field, start);
          if (value) {
            val = field.id;
          }
        }
        this._setConnected(o, 1, val);
      }
      if (2 === (2 & details)) {
        /** @type {Array} */
        start = [sum + x, spaceBefore + content];
        /** @type {null} */
        val = null;
        if (void 0 === name) {
          name = this.indexOf(o, start);
        }
        if (name !== -1) {
          field = $templateCache.get(name);
          value = $.evalConnPoint(field, start);
          if (value) {
            val = field.id;
          }
        }
        this._setConnected(o, 2, val);
      }
    },
    /**
     * @param {Object} target
     * @param {number} expectedNumberOfNonCommentArgs
     * @param {Object} body
     * @return {?}
     */
    _setConnected : function(target, expectedNumberOfNonCommentArgs, body) {
      var params = this._conn;
      var fn = params[target.id];
      return void 0 === fn && (fn = {}, params[target.id] = fn), 1 === (1 & expectedNumberOfNonCommentArgs) && (body ? fn.sid = body : delete fn.sid), 2 === (2 & expectedNumberOfNonCommentArgs) && (body ? fn.eid = body : delete fn.eid), void 0 === fn.sid && (void 0 === fn.eid && delete params[target.id]), this;
    },
    /**
     * @param {number} key
     * @return {undefined}
     */
    doOverSprite : function(key) {
      var otherMap = this._d;
      var props = otherMap.get(key);
      if (key === -1) {
        delete this._connSp;
        delete this._curInd;
      } else {
        if (key !== this._curInd) {
          this._connSp = $.extend({
            type : "__connpoint",
            fillStyle : "#f00",
            lw : 0.25,
            style : 3,
            d : $.connPointsPath(props)
          }, props);
          /** @type {number} */
          this._currInd = key;
        }
      }
    },
    /**
     * @param {Object} q
     * @param {Function} callback
     * @return {undefined}
     */
    find : function(q, callback) {
      var d = this._d;
      var testSource = this._conn;
      var name;
      for (name in testSource) {
        var ref = testSource[name];
        /** @type {number} */
        var context = 0;
        if (ref.sid === q.id && (context = 1), ref.eid === q.id && (context = 2 | context), 0 !== context && callback(d.id(name), context)) {
          break;
        }
      }
    },
    /**
     * @param {?} host
     * @return {undefined}
     */
    _doRenderer : function(host) {
      if (this._connSp) {
        host.renderer([this._connSp]);
      }
    }
  };
  /**
   * @param {Object} opt_renderer
   * @return {undefined}
   */
  var Tabs = function(opt_renderer) {
    /** @type {Object} */
    this.inst = opt_renderer;
    this._init();
  };
  Tabs.prototype = {
    /**
     * @return {undefined}
     */
    _init : function() {
      /** @type {number} */
      this._overInd = -1;
      this._listeners = {};
      this._bindEventScope();
      this.disabled(false);
    },
    /**
     * @param {boolean} recurring
     * @return {?}
     */
    disabled : function(recurring) {
      return void 0 !== recurring && (recurring ? (this._removeEventListener(), this._disabled = true, this._reset()) : (this._addEventListener(), this._disabled = false)), this._disabled;
    },
    /**
     * @return {undefined}
     */
    _removeEventListener : function() {
      var target = this.inst;
      var node = target.c;
      node.removeEventListener("touchstart", this._touchstartref);
      node.removeEventListener("touchmove", this._touchmoveref);
      node.removeEventListener("touchend", this._touchendref);
      node.removeEventListener("mousedown", this._mousedownref);
      node.removeEventListener("mousemove", this._mousemoveref);
      node.removeEventListener("mouseup", this._mouseupref);
    },
    /**
     * @return {undefined}
     */
    _addEventListener : function() {
      var cell = this.inst;
      var c = cell.c;
      c.addEventListener("touchstart", this._touchstartref, false);
      c.addEventListener("touchmove", this._touchmoveref, false);
      c.addEventListener("touchend", this._touchendref, false);
      c.addEventListener("mousedown", this._mousedownref, false);
      c.addEventListener("mousemove", this._mousemoveref, false);
      c.addEventListener("mouseup", this._mouseupref, false);
    },
    /**
     * @return {?}
     */
    newSprite : function() {
      var e = this.inst;
      /** @type {number} */
      var Y_m_d = 1;
      /** @type {number} */
      var center = 1;
      var me = this._opt;
      var t = me.type;
      var data = me.mode;
      var d = e._data;
      return "string" == typeof t && (t = {
        type : t
      }), 1 === data && (Y_m_d = 80, center = 80), t.w = t.w || Y_m_d, t.h = t.h || center, t.opacity = 0.5, d.gen(t);
    },
    /**
     * @param {?} opt_attributes
     * @return {undefined}
     */
    mode : function(opt_attributes) {
      this._opt = opt_attributes;
    },
    /**
     * @return {undefined}
     */
    _bindEventScope : function() {
      this._touchstartref = this._touchstart.bind(this);
      this._touchmoveref = this._touchmove.bind(this);
      this._touchendref = this._touchend.bind(this);
      this._mousedownref = this._mousedown.bind(this);
      this._mousemoveref = this._mousemove.bind(this);
      this._mouseupref = this._mouseup.bind(this);
    },
    /**
     * @param {Object} e
     * @return {?}
     */
    _touch : function(e) {
      var ret = {};
      var container = e.touches[0].target;
      var left = container.offsetLeft;
      var top = container.offsetTop;
      for (;container.offsetParent;) {
        left += container.offsetParent.offsetLeft;
        top += container.offsetParent.offsetTop;
        container = container.offsetParent;
      }
      return ret.offsetX = e.touches[0].pageX - left, ret.offsetY = e.touches[0].pageY - top, ret;
    },
    /**
     * @param {Object} e
     * @return {undefined}
     */
    _touchstart : function(e) {
      var facade = this._touch(e);
      /** @type {boolean} */
      this.touchDetected = true;
      this._onstart(facade);
    },
    /**
     * @param {Object} e
     * @return {undefined}
     */
    _touchmove : function(e) {
      e.preventDefault();
      this._onmove(this._touch(e));
    },
    /**
     * @param {Object} e
     * @return {undefined}
     */
    _touchend : function(e) {
      e.preventDefault();
      this._evalDblclick(this._touch(e));
    },
    /**
     * @param {Event} evt
     * @return {undefined}
     */
    _mousedown : function(evt) {
      if (!this.touchDetected) {
        evt.preventDefault();
        if (void 0 === this._ending) {
          this._onstart(evt);
        }
      }
    },
    /**
     * @param {Event} evt
     * @return {undefined}
     */
    _mousemove : function(evt) {
      if (!this.touchDetected) {
        evt.preventDefault();
        if (void 0 === this._ending) {
          this._onmove(evt);
        }
      }
    },
    /**
     * @param {Event} evt
     * @return {undefined}
     */
    _mouseup : function(evt) {
      if (!this.touchDetected) {
        evt.preventDefault();
        this._evalDblclick(evt);
      }
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _evalDblclick : function(e) {
      var self = this;
      var clientTop = self._lastime || 0;
      /** @type {number} */
      var top = (new Date).getTime() - clientTop;
      var time = this._opt;
      if (top < 280) {
        clearTimeout(self._ending);
        delete self._ending;
        self._dblclick(e);
      } else {
        if (self._lastime = (new Date).getTime(), !time || 2 !== time.mode && 3 !== time.mode) {
          self._onend(e);
        } else {
          var result = {
            offsetX : e.offsetX || e.layerX,
            offsetY : e.offsetY || e.layerY,
            target : e.target || e.srcElement
          };
          /** @type {number} */
          self._ending = setTimeout(function() {
            self._onend(result);
            delete self._ending;
          }, 280);
        }
      }
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _onstart : function(e) {
      var that = this.inst;
      var a = that._data;
      var scale = that._scale;
      /** @type {number} */
      var x = (e.offsetX || e.layerX) / scale[0];
      /** @type {number} */
      var y = (e.offsetY || e.layerY) / scale[1];
      /** @type {Array} */
      var camelKey = [x, y];
      var opts = this._opt;
      var l = a._s;
      /** @type {number} */
      var recurring = -1;
      var duplicates = this._tpt;
      if (void 0 === this._clickInd) {
        if (opts) {
          var mode = opts.mode;
          if (1 !== mode && (void 0 === this._nsp || null == this._nsp)) {
            var props = this.newSprite();
            if (props.x = x, props.y = y, 2 === mode || 3 === mode) {
              /** @type {Array} */
              props.ex = [{
                dx : 0,
                dy : 0
              }];
              /** @type {number} */
              props.style = 2;
            } else {
              if (4 === mode) {
                if (this._overInd !== -1) {
                  var data = $.evalConnPoint(a.get(this._overInd), camelKey);
                  if (null !== data) {
                    props.x = data[0];
                    props.y = data[1];
                  }
                }
                /** @type {number} */
                props.style = 2;
              }
            }
            this._nsp = props;
          }
        } else {
          if (this._overInd !== -1) {
            var self = a.get(this._overInd);
            if ("line" === self.type && (duplicates && 3 === duplicates[0])) {
              var results = self.ex || [];
              var px = self.dx || 0;
              var py = self.dy || 0;
              if (!$.isArray(results)) {
                /** @type {Array} */
                results = [results];
              }
              var center1 = $.spRotate(self, camelKey, -1, true);
              results.splice(duplicates[1], 0, {
                dx : center1[0] - self.x - px,
                dy : center1[1] - self.y - py
              });
              self.ex = results;
              this._evalSelected(e);
            }
          }
          recurring = this._overInd;
          /** @type {boolean} */
          var u = recurring !== -1 || !!duplicates && duplicates[0] !== -1;
          if (recurring !== -1 || u) {
            if (recurring !== -1) {
              l.evalClick(recurring);
            }
          } else {
            l.update([]);
            this._selRect = {
              type : "rect",
              dashed : 0,
              style : 2,
              x : x,
              y : y,
              w : 1,
              h : 1
            };
          }
        }
        this._clickInd = recurring;
        /** @type {Array} */
        this._spt = camelKey;
      }
      that.update();
      var which = this._listeners.start;
      if (which) {
        $.each(which, function(fmt) {
          console.log(fmt);
          fmt(recurring);
        });
      }
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _onmove : function(e) {
      var self = this;
      var me = self.inst;
      var data = me._data;
      var scale = me._scale;
      /** @type {number} */
      var maxX = (e.offsetX || e.layerX) / scale[0];
      /** @type {number} */
      var maxY = (e.offsetY || e.layerY) / scale[1];
      /** @type {Array} */
      var name = [maxX, maxY];
      var result = self._spt || name;
      var minX = result[0];
      var minY = result[1];
      var field = e.target || e.srcElement;
      var c = self._nsp;
      var a = self._opt;
      var method = data._s;
      var r = self._selRect;
      var target = self._tpt;
      var path = data._c;
      /** @type {boolean} */
      var crosshair = true;
      var len = self._clickInd;
      /** @type {boolean} */
      var v = len !== -1 || !!target && target[0] !== -1;
      if (a) {
        if (1 === a.mode) {
          if (!c) {
            c = self.newSprite();
            self._nsp = c;
          }
          /** @type {number} */
          c.x = maxX - c.w / 2;
          /** @type {number} */
          c.y = maxY - c.h / 2;
          delete c.d;
        } else {
          if (2 === a.mode || 3 === a.mode) {
            if (field.style.cursor = "crosshair", crosshair = !!c) {
              var cl = c.ex;
              var dragged = cl[cl.length - 1];
              /** @type {number} */
              var dx = maxX - c.x;
              /** @type {number} */
              var dy = maxY - c.y;
              if (void 0 === self._clickInd || 3 === a.mode) {
                if (cl.length < 2) {
                  dragged = {
                    dx : dx,
                    dy : dy
                  };
                  cl[cl.length] = dragged;
                }
                /** @type {number} */
                dragged.dx = dx;
                /** @type {number} */
                dragged.dy = dy;
              } else {
                cl[cl.length] = {
                  dx : dx,
                  dy : dy
                };
              }
              delete c.d;
            }
          } else {
            if (4 === a.mode) {
              /** @type {number} */
              var width = maxX - minX;
              /** @type {number} */
              var height = maxY - minY;
              var i = self._overInd;
              if (field.style.cursor = "crosshair", c) {
                if (self._overInd !== -1) {
                  var current = $.evalConnPoint(data.get(self._overInd), name);
                  if (null !== current) {
                    /** @type {number} */
                    width = current[0] - c.x;
                    /** @type {number} */
                    height = current[1] - c.y;
                  }
                }
                /** @type {number} */
                c.w = width;
                /** @type {number} */
                c.h = height;
                delete c.d;
                i = path.indexOf(c, name);
              } else {
                i = data.indexOf(name);
              }
              path.doOverSprite(i);
            } else {
              /** @type {string} */
              field.style.cursor = "crosshair";
              /** @type {boolean} */
              crosshair = !!c;
              if (crosshair) {
                /** @type {number} */
                c.w = maxX - minX;
                /** @type {number} */
                c.h = maxY - minY;
                delete c.d;
                delete c.ex;
              }
            }
          }
        }
      } else {
        if (void 0 === self._clickInd) {
          self._evalSelected(e);
          /** @type {boolean} */
          crosshair = false;
        } else {
          if (self._clickInd !== -1 || v) {
            if (v) {
              self._targetObj = method.target(target, result, name);
              path.doSelectedSprite(target, name);
            }
          } else {
            r.x = minX;
            r.y = minY;
            /** @type {number} */
            r.w = maxX - minX;
            /** @type {number} */
            r.h = maxY - minY;
            delete r.d;
          }
        }
      }
      if (crosshair) {
        me.update();
      }
      var which = this._listeners.move;
      if (which) {
        $.each(which, function(orig) {
          orig.apply(me, target);
        });
      }
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _onend : function(e) {
      var that = this.inst;
      var self = that._data;
      var scale = that._scale;
      /** @type {number} */
      var max = (e.offsetX || e.layerX) / scale[0];
      /** @type {number} */
      var y = (e.offsetY || e.layerY) / scale[1];
      /** @type {Array} */
      var child = [max, y];
      var input = this._spt || child;
      var min = input[0];
      var touchY = input[1];
      var args = this._tpt;
      var field = e.target || e.srcElement;
      var opts = this._opt;
      var c = this._nsp;
      /** @type {boolean} */
      var p = true;
      var event = self._s;
      var source = self._c;
      var next = this._clickInd;
      /** @type {boolean} */
      var escaped = next !== -1 || null != args && args[0] !== -1;
      if (opts) {
        var mode = opts.mode;
        if (1 !== mode) {
          /** @type {number} */
          var w = max - min;
          /** @type {number} */
          var dy = y - touchY;
          if (2 === mode || 3 === mode) {
            /** @type {number} */
            w = max - c.x;
            /** @type {number} */
            dy = y - c.y;
            var cl = c.ex;
            /** @type {Array} */
            var suiteView = [c.x + cl[0].dx, c.y + cl[0].dy];
            p = cl.length > 2 && $.isNearbyPoint(suiteView, child);
            if (p) {
              cl.splice(cl.length - 1, 1);
              /** @type {boolean} */
              c.closed = true;
              /** @type {number} */
              c.style = 3;
              $.adjSprite(c);
            } else {
              cl[cl.length] = {
                dx : w,
                dy : dy
              };
              /** @type {number} */
              c.w = Math.max(c.w, w);
              /** @type {number} */
              c.h = Math.max(c.h, dy);
              /** @type {number} */
              c.style = 2;
            }
          } else {
            if (4 === mode) {
              if (w = max - c.x, dy = y - c.y, this._overInd !== -1) {
                var position = $.evalConnPoint(self.get(this._overInd), child);
                if (null !== position) {
                  /** @type {number} */
                  w = position[0] - c.x;
                  /** @type {number} */
                  dy = position[1] - c.y;
                }
              }
              source.doOverSprite(-1);
              /** @type {number} */
              c.w = w;
              /** @type {number} */
              c.h = dy;
            } else {
              /** @type {number} */
              c.w = w || 80;
              /** @type {number} */
              c.h = dy || 80;
            }
          }
        }
        if (delete c.d, p) {
          /** @type {string} */
          field.style.cursor = "default";
          delete c.opacity;
          self.add(c);
          if (source.isConnector(c)) {
            source.connect(c, 3);
          }
          /** @type {number} */
          var values = self.get().length - 1;
          event.update(values, true);
          delete this._nsp;
          delete this._opt;
          delete this._mode;
          /** @type {Array} */
          args = [4, values];
        }
      } else {
        if (next === -1 && !escaped) {
          var recurring = self.indexsOf(input, child);
          if (recurring.length > 0) {
            event.update(recurring, true);
          }
        }
      }
      if (this._targetObj) {
        event.target(args, input, child, true);
        that.update();
        event._updateSelSprite();
        source.doOverSprite(-1);
        if (!(args[0] !== -1)) {
          if (!(input[0] === child[0] && input[1] === child[1])) {
            /** @type {Array} */
            args = [5, next];
          }
        }
      }
      this._reset();
      that.update();
      var which = this._listeners.end;
      if (which) {
        $.each(which, function(alertCallback) {
          alertCallback.apply(that, args);
        });
      }
    },
    /**
     * @return {undefined}
     */
    _reset : function() {
      delete this._selRect;
      delete this._targetObj;
      delete this._clickInd;
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _dblclick : function(e) {
      var me = this.inst;
      var d = me._data;
      var scale = me._scale;
      /** @type {number} */
      var offsetLeft = (e.offsetX || e.layerX) / scale[0];
      /** @type {number} */
      var bbb = (e.offsetY || e.layerY) / scale[1];
      /** @type {Array} */
      var start = [offsetLeft, bbb];
      var field = e.target || e.srcElement;
      var opts = this._opt;
      var el = this._nsp;
      var container = d._s;
      if (opts) {
        var mode = opts.mode;
        if (2 === mode || 3 === mode) {
          var events = el.ex;
          /** @type {Array} */
          var form = [el.x + events[0].dx, el.y + events[0].dy];
          var value = $.isNearbyPoint(form, start);
          /** @type {number} */
          el.style = value ? 3 : 2;
          if (value) {
            el.closed = value;
            events.splice(events.length - 1, 1);
          }
          $.adjSprite(el);
          delete el.d;
          /** @type {string} */
          field.style.cursor = "default";
          delete el.opacity;
          d.add(el);
          container.update(d.get().length - 1);
          delete this._nsp;
          delete this._opt;
          delete this._mode;
          delete this._clickInd;
          me.update();
        }
      }
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    _evalSelected : function(e) {
      var me = this.inst;
      var data = me._data;
      var doc = data._g;
      var res = data._s;
      var scale = me._scale;
      /** @type {number} */
      var some = (e.offsetX || e.layerX) / scale[0];
      /** @type {number} */
      var listener = (e.offsetY || e.layerY) / scale[1];
      /** @type {Array} */
      var type = [some, listener];
      var field = e.target || e.srcElement;
      /** @type {string} */
      var val = "default";
      var name = data.indexOf(type);
      /** @type {null} */
      var args = null;
      if (name !== -1 && (val = "move"), res) {
        args = res.targetPointType(type);
        var pageY = args[0];
        var parent = args[1];
        var id = args[2];
        var el = args[3];
        /** @type {null} */
        var node = null;
        switch(pageY !== -1 && (name !== -1 ? (node = data.get(name), node.id !== id && (name = data.indexById(id))) : name = data.indexById(id)), name !== -1 && (node = data.get(name)), pageY) {
          case 3:
          ;
          case 2:
          ;
          case 0:
            /** @type {string} */
            val = "crosshair";
            break;
          case 1:
            /** @type {number} */
            var i = 0;
            if (node && (i = node.rotate || 0), el) {
              var rect = doc.id(el);
              i = rect.rotate || 0;
            }
            val = $.resizeCursor(parent, i);
            break;
          default:
            if (node) {
              args[2] = node.id;
            }
          ;
        }
      }
      field.style.cursor = val;
      this._overInd = name;
      this._tpt = args;
    },
    /**
     * @param {string} type
     * @param {Function} one
     * @return {undefined}
     */
    on : function(type, one) {
      var list = this._listeners[type];
      if (list) {
        /** @type {Function} */
        list[list.length] = one;
      } else {
        /** @type {Array} */
        list = [one];
        /** @type {Array} */
        this._listeners[type] = list;
      }
    }
  };
  /**
   * @param {Object} data
   * @param {Array} texturePath
   * @return {undefined}
   */
  var Model = function(data, texturePath) {
    this._types = {
      __sel : $.edgePointPath,
      __grp : $.edgePointPath,
      __line : $.linePointPath
    };
    /** @type {Object} */
    this._data = data;
    this._selInds = texturePath || [];
    /** @type {Array} */
    this._selSps = [];
    this._updateSelSprite();
  };
  Model.prototype = {
    /**
     * @param {Object} self
     * @param {number} opt_attributes
     * @param {(Array|string)} rtt
     * @return {undefined}
     */
    _resize : function(self, opt_attributes, rtt) {
      var cx = self.x;
      var y = self.y;
      var width = self.w;
      var h = self.h;
      var node = self.rc || [cx + width / 2, y + h / 2];
      var px = rtt[0];
      var dist = rtt[1];
      var l = self.initRotate || 0;
      var _z = (self.rotate || 0) + l;
      /** @type {boolean} */
      var trimmedClasses = "line" === self.type;
      /** @type {Array} */
      var classes = trimmedClasses ? [0, 0] : [1, 1];
      if (1 === (1 & opt_attributes) && (self.w += px, trimmedClasses || (classes[0] += px / width)), 2 === (2 & opt_attributes) && (self.y += dist, self.h -= dist, trimmedClasses ? classes[1] = -dist : classes[1] -= dist / h), 4 === (4 & opt_attributes) && (self.x += px, self.w -= px, trimmedClasses ? classes[0] = -px : classes[0] -= px / width), 8 === (8 & opt_attributes) && (self.h += dist, trimmedClasses || (classes[1] += dist / h)), 0 !== _z) {
        var r = self.x + self.w / 2;
        var b = self.y + self.h / 2;
        var n = $.rotate(node, [r, b], _z);
        self.x += n[0] - r;
        self.y += n[1] - b;
      }
      $.updateEx(self, classes, !trimmedClasses);
    },
    /**
     * @param {Object} self
     * @param {number} dataAndEvents
     * @param {Object} rtt
     * @param {Object} opt_offset
     * @return {undefined}
     */
    _gresize : function(self, dataAndEvents, rtt, opt_offset) {
      var me = this;
      var data = me._data;
      var x = self.x;
      var y = self.y;
      var width = self.w;
      var h = self.h;
      var startX = x + width;
      var startY = y + h;
      var node = self.rc || [x + width / 2, y + h / 2];
      /** @type {number} */
      var scale = 1;
      var w = rtt[0];
      var i = rtt[1];
      var config = data._g;
      var offset = opt_offset || config.id(config.rootId(self.grpId));
      var t = self.initRotate || 0;
      var _z = (self.rotate || 0) + t;
      /** @type {Array} */
      var params = [1, 1];
      if (1 === (1 & dataAndEvents) && (scale = 1 + w / offset.w, self.w = width * scale, self.x = offset.x + parseInt((x - offset.x) * scale), params[0] = scale), 2 === (2 & dataAndEvents) && (scale = 1 - i / offset.h, self.h = h * scale, self.y = offset.y + offset.h - self.h + (startY - offset.y - offset.h) * scale, params[1] = scale), 4 === (4 & dataAndEvents) && (scale = 1 - w / offset.w, self.w = width * scale, self.x = offset.x + offset.w - self.w + (startX - offset.x - offset.w) * scale, params[0] = 
      scale), 8 === (8 & dataAndEvents) && (scale = 1 + i / offset.h, self.h = h * scale, self.y = offset.y + (y - offset.y) * scale, params[1] = scale), 0 !== _z) {
        var r = self.x + self.w / 2;
        var b = self.y + self.h / 2;
        var n = $.rotate(node, [r, b], _z);
        self.x += n[0] - r;
        self.y += n[1] - b;
      }
      $.updateEx(self, params, true);
    },
    /**
     * @param {string} sub
     * @return {?}
     */
    _indexOfRotate : function(sub) {
      var codeSegments = this.data();
      /** @type {number} */
      var foundI = -1;
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        if ($.isRotatePoint(codeSegments[i], sub)) {
          /** @type {number} */
          foundI = i;
          break;
        }
      }
      return foundI;
    },
    /**
     * @param {Object} self
     * @param {Array} e
     * @param {Array} dataAndEvents
     * @return {?}
     */
    _rotate : function(self, e, dataAndEvents) {
      var cx = self.x;
      var y = self.y;
      var width = self.w;
      var h = self.h;
      var x1 = cx + width / 2;
      var y1 = y + h / 2;
      /** @type {number} */
      var j = Math.atan2(dataAndEvents[1] - y1, dataAndEvents[0] - x1) - Math.atan2(e[1] - y1, e[0] - x1);
      return[x1, y1, j];
    },
    /**
     * @param {Object} self
     * @param {number} i
     * @param {Array} response
     * @param {Array} dataAndEvents
     * @return {undefined}
     */
    _exPoint : function(self, i, response, dataAndEvents) {
      /** @type {number} */
      var dx = dataAndEvents[0] - response[0];
      /** @type {number} */
      var dy = dataAndEvents[1] - response[1];
      var events = self.ex || [];
      if (!$.isArray(events)) {
        /** @type {Array} */
        events = [events];
      }
      if (i !== -1) {
        if (i < events.length) {
          if ("line" === self.type && $.isOverExLine(self, i, dataAndEvents)) {
            events.splice(i, 1);
          } else {
            events[i].dx += dx;
            events[i].dy += dy;
          }
          self.ex = 1 === events.length ? events[0] : events;
        }
      }
    },
    /**
     * @param {string} input
     * @return {?}
     */
    targetPointType : function(input) {
      var e = this;
      var data = e._data;
      var which = e.data();
      /** @type {number} */
      var value = -1;
      var params = data._g;
      var done = {};
      /** @type {null} */
      var t = null;
      /** @type {number} */
      var r = -1;
      /** @type {null} */
      var id = null;
      return $.each(which, function(elem, _value) {
        if (id = null, elem.grpId) {
          if (id = params.rootId(elem.grpId), done[id]) {
            return false;
          }
          elem = params.id(id);
          /** @type {boolean} */
          done[id] = true;
        }
        return value = $.indexOfEx(elem, input), value !== -1 ? (r = 0, t = elem.id, true) : (value = $.edgePointType(elem, input), 0 !== value ? (r = 1, t = elem.id, true) : (value = -1, value === -1 && $.isRotatePoint(elem, input) ? (r = 2, value = _value, t = elem.id, true) : "line" === elem.type && (value = $.indexOfExHalf(elem, input), value !== -1) ? (r = 3, t = elem.id, true) : void 0));
      }), [r, value, t, id];
    },
    /**
     * @param {Array} options
     * @param {Array} response
     * @param {Object} node
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    target : function(options, response, node, deepDataAndEvents) {
      var that = this;
      var elem = that._data;
      var which = that.data();
      var parent = elem._g;
      /** @type {Array} */
      var data = [];
      /** @type {number} */
      var _z = 0;
      var hc = options[0];
      /** @type {null} */
      var self = null;
      var done = {};
      /** @type {number} */
      var x = node[0] - response[0];
      /** @type {number} */
      var height = node[1] - response[1];
      /** @type {number} */
      var ratio = 1;
      /** @type {number} */
      var GiMf = 1;
      /** @type {number} */
      var name = -1;
			var exports = elem._c;
      /** @type {boolean} */
      var found = false;
      if (null != options[2]) {
        if (self = options[3] ? parent.id(options[3]) : elem.id(options[2]), found = exports.isConnector(self), found && (name = exports.indexOf(self, node), name !== -1)) {
          var output = $.evalConnPoint(elem.get(name), node);
          if (null != output) {
            if (6 === options[1]) {
              /** @type {Array} */
              response = [self.x, self.y];
            } else {
              if (9 === options[1]) {
                /** @type {Array} */
                response = [self.x + self.w, self.y + self.h];
              }
            }
            node = output;
            /** @type {number} */
            x = node[0] - response[0];
            /** @type {number} */
            height = node[1] - response[1];
          }
        }
        if (1 === hc) {
          response = $.spRotate(self, response, -1, true);
          node = $.spRotate(self, node, -1, true);
          /** @type {number} */
          x = node[0] - response[0];
          /** @type {number} */
          height = node[1] - response[1];
        }
        if (0 !== self.w) {
          /** @type {number} */
          ratio = x / self.w;
        }
        if (0 !== self.h) {
          /** @type {number} */
          GiMf = height / self.h;
        }
        if (2 === hc) {
          _z = that._rotate(self, response, node)[2];
        }
      }
      return $.each(which, function(object) {
        if (found && (hc !== -1 && object.id !== self.id)) {
          return false;
        }
        /** @type {null} */
        var id = null;
        /** @type {null} */
        var s = null;
        /** @type {null} */
        var rtt = null;
        /** @type {null} */
        var trans = null;
        if (object.grpId) {
          if (id = parent.rootId(object.grpId), done[id]) {
            return false;
          }
          object = parent.id(id);
          s = new loop(elem, object);
          /** @type {Array} */
          trans = [object.x + object.w / 2, object.y + object.h / 2, _z];
          /** @type {boolean} */
          done[id] = true;
        }
        if (!deepDataAndEvents) {
          object = $.clone(object);
        }
        var bx = object.x;
        var by = object.y;
        var length = object.w;
        var h = object.h;
        var el = bx + length / 2;
        var by_b_h_h = by + h / 2;
        /** @type {number} */
        var idx = 0;
        switch(hc) {
          case 0:
            that._exPoint(object, options[1], response, node);
            break;
          case 1:
            if (idx = exports.connected(object), !found && 3 === idx || found && !exports.isConnector(object)) {
              return false;
            }
            /** @type {Array} */
            rtt = [0 === length ? x : length * ratio, 0 === h ? height : h * GiMf];
            if (null != s) {
              s.loop(function(object) {
                if (!("__grp" === object.type)) {
                  if (!deepDataAndEvents) {
                    object = $.clone(object);
                    /** @type {number} */
                    object.opacity = 0.5;
                    /** @type {Object} */
                    data[data.length] = object;
                  }
                }
                that._gresize(object, options[1], rtt, s._g);
                delete object.d;
              });
            }
            that._resize(object, options[1], rtt);
            if (!found) {
              exports.find(object, function(c, dataAndEvents) {
                if (!deepDataAndEvents) {
                  c = $.clone(c);
                  /** @type {number} */
                  c.opacity = 0.5;
                }
                /** @type {number} */
                var weigthFactor = 0;
                /** @type {number} */
                var ay = 0;
                /** @type {null} */
                var rtt = null;
                if (1 === dataAndEvents) {
                  /** @type {number} */
                  weigthFactor = c.x - bx;
                  /** @type {number} */
                  ay = c.y - by;
                  /** @type {Array} */
                  rtt = [object.x + object.w * weigthFactor / length - c.x, object.y + object.h * ay / h - c.y];
                  that._resize(c, 6, rtt);
                }
                if (2 === dataAndEvents) {
                  /** @type {number} */
                  weigthFactor = c.x + c.w - bx;
                  /** @type {number} */
                  ay = c.y + c.h - by;
                  /** @type {Array} */
                  rtt = [object.x + object.w * weigthFactor / length - c.x - c.w, object.y + object.h * ay / h - c.y - c.h];
                  that._resize(c, 9, rtt);
                }
                delete c.d;
                /** @type {Object} */
                data[data.length] = c;
              });
            }
            break;
          case 2:
            if (idx = exports.connected(object), !found && 3 === idx || found && !exports.isConnector(object)) {
              return false;
            }
            if (null != s) {
              s.loop(function(object) {
                var type = object.x;
                var r = object.y;
                var length = object.w;
                var height = object.h;
                var key = type + length / 2;
                var y = r + height / 2;
                var id = object.rotate || 0;
                if (!("__grp" === object.type)) {
                  if (!deepDataAndEvents) {
                    object = $.clone(object);
                    /** @type {number} */
                    object.opacity = 0.5;
                    /** @type {Object} */
                    data[data.length] = object;
                  }
                }
                var point = $.rotate(trans, [key, y], _z);
                object.x += point[0] - key;
                object.y += point[1] - y;
                object.rotate = id + _z;
                delete object.d;
              });
            }
            object.rotate = (object.rotate || 0) + _z;
            if (!found) {
              exports.find(object, function(node, dataAndEvents) {
                var normalizedRange = exports.connectType(node);
                if (!deepDataAndEvents) {
                  node = $.clone(node);
                  /** @type {number} */
                  node.opacity = 0.5;
                }
                /** @type {number} */
                var j = -1;
                var left = node._x || node.x;
                var startY = node._y || node.y;
                /** @type {null} */
                var vertices = null;
                if (3 === normalizedRange) {
                  j = $.inArray(data, function(handlerWebView) {
                    return handlerWebView.id === node.id;
                  });
                  if (j !== -1) {
                    node = data[j];
                  }
                }
                if (1 === dataAndEvents) {
                  vertices = $.rotate([el, by_b_h_h], [node.x, node.y], _z);
                  node._x = node.x;
                  node._y = node.y;
                  node.x = vertices[0];
                  node.y = vertices[1];
                }
                if (2 === dataAndEvents) {
                  vertices = $.rotate([el, by_b_h_h], [left + node.w, startY + node.h], _z);
                  /** @type {number} */
                  node.w = vertices[0] - node.x;
                  /** @type {number} */
                  node.h = vertices[1] - node.y;
                  delete node._x;
                  delete node._y;
                }
                delete node.d;
                if (j === -1) {
                  /** @type {Object} */
                  data[data.length] = node;
                }
              });
            }
            break;
          default:
            if (null != s) {
              s.loop(function(attr) {
                if (!("__grp" === attr.type)) {
                  if (!deepDataAndEvents) {
                    attr = $.clone(attr);
                    /** @type {number} */
                    attr.opacity = 0.5;
                    /** @type {Object} */
                    data[data.length] = attr;
                  }
                }
                attr.x += x;
                attr.y += height;
                that._connOnMove(attr, [x, height], data, deepDataAndEvents);
                delete attr.d;
              });
            }
            object.x += x;
            object.y += height;
            if (!found) {
              that._connOnMove(object, [x, height], data, deepDataAndEvents);
            }
          ;
        }
        if (!("__grp" === object.type)) {
          if (!deepDataAndEvents) {
            /** @type {number} */
            object.opacity = 0.5;
            /** @type {Object} */
            data[data.length] = object;
          }
        }
        delete object.d;
      }), deepDataAndEvents && (found && exports.connect(self, 6 === options[1] ? 1 : 9 === options[1] ? 2 : 3, name)), this._onend = !!deepDataAndEvents, data;
    },
    /**
     * @param {Object} val
     * @param {Array} $cookies
     * @param {Array} children
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    _connOnMove : function(val, $cookies, children, deepDataAndEvents) {
      var that = this;
      var elem = that._data;
      var parent = elem._c;
      var value = $cookies[0];
      var deltaY = $cookies[1];
      parent.find(val, function(object, dataAndEvents) {
        if (that.indexOf(object) === -1) {
          var promise = parent.connectType(object);
          if (!deepDataAndEvents) {
            object = $.clone(object);
            /** @type {number} */
            object.opacity = 0.5;
          }
          if (3 === promise) {
            if (1 === dataAndEvents) {
              that._resize(object, 6, [value, deltaY]);
            }
            if (2 === dataAndEvents) {
              that._resize(object, 9, [value, deltaY]);
            }
            delete object.d;
            /** @type {Object} */
            children[children.length] = object;
          } else {
            object.x += value;
            object.y += deltaY;
            delete object.d;
            /** @type {Object} */
            children[children.length] = object;
          }
        }
      });
    },
    /**
     * @param {Object} object
     * @return {?}
     */
    indexOf : function(object) {
      var which = this.data();
      /** @type {number} */
      var text = -1;
      return $.each(which, function(subject, textAlt) {
        if (object.id === subject.id) {
          return text = textAlt, true;
        }
      }, true), text;
    },
    /**
     * @param {Object} recurring
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    update : function(recurring, dataAndEvents) {
      if (this._onend = !!dataAndEvents, void 0 !== recurring) {
        /** @type {Array} */
        var applyArgs = [0, this._selInds.length].concat(recurring);
        Array.prototype.splice.apply(this._selInds, applyArgs);
        delete this._curInd;
      }
      this._updateSelSprite();
    },
    /**
     * @param {string} key
     * @return {?}
     */
    data : function(key) {
      var R = this._data;
      var name = this._selInds;
      return void 0 === key ? R.get(name) : R.get(name[key]);
    },
    /**
     * @param {Array} node
     * @return {?}
     */
    newData : function(node) {
      return function(part) {
        /** @type {Array} */
        var current = node;
        return void 0 !== part && (current = node[part]), current;
      };
    },
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    _updateSelSprite : function(dataAndEvents) {
      var self = this;
      var dom = self._data;
      var children = dom._c;
      var codeSegments = self.data();
      /** @type {Array} */
      var messages = [];
      var domStyle = dom._g;
      var oSpace = {};
      /**
       * @param {?} nodes
       * @return {?}
       */
      var parse = function(nodes) {
        return $.inArray(["x", "y", "w", "h", "ex", "rotate"], nodes) === -1;
      };
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        var item = codeSegments[i];
        /** @type {boolean} */
        var isLast = i === self._curInd;
        /** @type {number} */
        var lw = 0.5;
        if (item.grpId) {
          var n = domStyle.rootId(item.grpId);
          if (oSpace[n]) {
            continue;
          }
          /** @type {boolean} */
          oSpace[n] = true;
          var name = domStyle.indexById(n);
          if (name !== -1) {
            var bot = domStyle.get(name);
            if (dataAndEvents) {
              bot.update();
            }
            /** @type {number} */
            bot._g.lw = lw;
            messages[messages.length] = bot._g;
          }
        } else {
          if (messages[messages.length] = $.extend({
            type : "line" === item.type ? "__line" : "__sel",
            strokeStyle : isLast ? "#000" : "#888",
            fillStyle : "#fff",
            lw : lw,
            style : 3
          }, item, false, parse), self._onend && children.isConnector(item)) {
            var nodes = children.connectType(item);
            if (0 !== nodes) {
              messages[messages.length] = {
                fillStyle : "#f00",
                d : $.connPointsPath(item, nodes)
              };
            }
          }
        }
      }
      /** @type {Array} */
      self._selSps = messages;
    },
    /**
     * @param {?} options
     * @return {undefined}
     */
    _doRenderer : function(options) {
      options.jh2d.renderer(this._selSps, this._types);
    },
    /**
     * @return {undefined}
     */
    remove : function() {
      var me = this;
      var data = me._data;
      var d = this.data();
      data.remove(d);
      this.update([]);
    },
    /**
     * @param {?} props
     * @return {undefined}
     */
    style : function(props) {
      var which = this.data();
      $.each(which, function(el) {
        fn(el, props);
      });
    },
    /**
     * @return {undefined}
     */
    group : function() {
      var e = this;
      var self = e._data;
      var data = self._g;
      data.group(this.data());
      this._updateSelSprite(true);
    },
    /**
     * @return {undefined}
     */
    ungroup : function() {
      var m = this;
      var _data = m._data;
      var x = _data._g;
      x.ungroup(this.data());
      this._updateSelSprite(true);
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {undefined}
     */
    arrange : function(expectedNumberOfNonCommentArgs) {
      var me = this;
      var data = me._data;
      data.arrange(this.data(), expectedNumberOfNonCommentArgs);
    },
    /**
     * @param {number} recurring
     * @return {undefined}
     */
    evalClick : function(recurring) {
      var me = this;
      var data = me._data;
      var index = this.indexOf(data.get(recurring));
      if (index === -1) {
        this.update(recurring);
      } else {
        this._curInd = index;
        this._updateSelSprite();
      }
    },
    /**
     * @param {number} step
     * @param {Function} offset
     * @return {undefined}
     */
    align : function(step, offset) {
      var self = this;
      var data = self._data;
      var len = self._curInd;
      var which = self.data();
      var model = data._g;
      var i = offset || 0;
      /** @type {Array} */
      var names = ["x", "y"];
      /** @type {Array} */
      var vertices = ["w", "h"];
      /** @type {Array} */
      var args = [1, 8];
      if (void 0 !== len && len !== -1) {
        var e = which[len];
        /** @type {null} */
        var id = null;
        if (e.grpId) {
          id = model.rootId(e.grpId);
          e = model.id(id);
        }
        /** @type {Array} */
        var a = [e.x, e.y];
        /** @type {Array} */
        var arr2 = [e.w, e.h];
        var old = {};
        $.each(which, function(e, expected) {
          /** @type {null} */
          var me = null;
          /** @type {string} */
          var b = e;
          /** @type {null} */
          var name = null;
          /** @type {number} */
          var free = 0;
          if (e.grpId) {
            if (name = model.rootId(e.grpId), null != id && name === id) {
              return false;
            }
            if (old[name]) {
              return false;
            }
            b = model.id(name);
            me = new loop(data, b);
            /** @type {boolean} */
            old[name] = true;
          }
          if (len !== expected) {
            switch(step) {
              case 0:
                /** @type {number} */
                free = a[i] - b[names[i]];
                break;
              case 1:
                /** @type {number} */
                free = a[i] + arr2[i] - b[names[i]] - b[vertices[i]];
                break;
              case 2:
                /** @type {number} */
                free = a[i] + arr2[i] / 2 - b[names[i]] - b[vertices[i]] / 2;
                break;
              case 3:
                /** @type {number} */
                free = arr2[i] - b[vertices[i]];
                if (null != me) {
                  me.resize(args[i], 0 === i ? [free, 0] : [0, free], me, self._gresize.bind(self));
                  b[vertices[i]] += free;
                  delete b.d;
                } else {
                  self._resize(e, args[i], [0, 0], 0 === i ? [free, 0] : [0, free]);
                }
              ;
            }
            if (0 !== free) {
              if (3 !== step) {
                if (null != me) {
                  me.move(0 === i ? [free, 0] : [0, free]);
                  b[names[i]] += free;
                  delete b.d;
                } else {
                  e[names[i]] += free;
                }
              }
            }
            delete e.d;
          }
        });
        this._updateSelSprite();
      }
    },
    /**
     * @return {?}
     */
    current : function() {
      var dragKey;
      var browserEvent = this;
      var keyIdentifier = browserEvent._curInd;
      var originScope = browserEvent.data();
      return void 0 !== keyIdentifier && (keyIdentifier !== -1 && (dragKey = originScope[keyIdentifier])), dragKey;
    }
  };
  var o = {
    _grid : $.bgGridPath
  };
  /**
   * @param {string} args
   * @return {undefined}
   */
  var init = function(args) {
    var c = "string" == typeof args.canvas ? document.getElementById(args.canvas) : args.canvas;
    var POST = args.types || {};
    var options = this;
    options._bg = {
      type : "_grid",
      x : 0,
      y : 0,
      w : c.width,
      h : c.height,
      style : 2,
      strokeStyle : "#eee"
    };
    options._types = POST;
    options.c = c;
    /**
     * @return {undefined}
     */
    args.onResourceLoad = function() {
      options.update();
    };
    options.jh2d = args.jh2d.create(args);
    /** @type {Array} */
    options._scale = [1, 1];
    options.data(args);
    options._event = new Tabs(options);
  };
  init.prototype = {
    /**
     * @param {string} name
     * @return {?}
     */
    data : function(name) {
      /** @type {null} */
      var value = null;
      return void 0 === name ? this._data.data() : (value = new Node(name), this._data = value, name.o.bg && this._background(name.o.bg), void 0);
    },
    /**
     * @param {(Error|string)} obj
     * @return {undefined}
     */
    add : function(obj) {
      this._data.add(obj);
      this.update();
    },
    /**
     * @param {boolean} recurring
     * @return {?}
     */
    disabled : function(recurring) {
      var cur = this._event;
      return cur.disabled(recurring);
    },
    /**
     * @param {Object} recurring
     * @return {undefined}
     */
    update : function(recurring) {
      var that = this;
      var element = that._event;
      var suiteView = element._selRect;
      var a = that._data;
      var l = a._s;
      var h = a._c;
      var cache = element._targetObj;
      var html = element._nsp;
      var name = that._types;
      var options = that.jh2d;
      var scale = that._scale;
      var rect = that.c;
      var argv = that._bg;
      if (!(argv.w === rect.width && argv.h === rect.height)) {
        argv.w = rect.width;
        argv.h = rect.height;
        delete argv.d;
      }
      if (recurring) {
        $.each(l.data(), function(el) {
          fn(el, recurring);
        });
      }
      options.save();
      options.clear();
      options.renderer(argv, o);
      options.scale(scale[0], scale[1]);
      options.renderer(a.get(), name);
      if (l) {
        l._doRenderer(that);
      }
      if (suiteView) {
        options.renderer(suiteView, name);
      }
      if (cache) {
        options.renderer(cache, name);
      }
      if (html) {
        options.renderer(html, name);
      }
      h._doRenderer(options);
      options.restore();
    },
    /**
     * @param {?} opt_attributes
     * @return {undefined}
     */
    mode : function(opt_attributes) {
      var e = this._event;
      e.mode(opt_attributes);
    },
    /**
     * @return {undefined}
     */
    remove : function() {
      var a = this._data;
      var al = a._s;
      al.remove();
      this.update();
    },
    /**
     * @return {undefined}
     */
    group : function() {
      var data = this._data;
      var param = data._s;
      param.group();
      this.update();
    },
    /**
     * @return {undefined}
     */
    ungroup : function() {
      var a = this._data;
      var al = a._s;
      al.ungroup();
      this.update();
    },
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {undefined}
     */
    arrange : function(expectedNumberOfNonCommentArgs) {
      var a = this._data;
      var al = a._s;
      al.arrange(expectedNumberOfNonCommentArgs);
      this.update();
    },
    /**
     * @return {undefined}
     */
    bring2Front : function() {
      this.arrange(1);
    },
    /**
     * @return {undefined}
     */
    send2Back : function() {
      this.arrange(2);
    },
    /**
     * @return {undefined}
     */
    bring2Forward : function() {
      this.arrange(3);
    },
    /**
     * @return {undefined}
     */
    send2Backward : function() {
      this.arrange(4);
    },
    /**
     * @param {number} step
     * @return {undefined}
     */
    align : function(step) {
      var data = this._data;
      var element = data._s;
      element.align(step % 4, parseInt(step / 4));
      this.update();
    },
    /**
     * @return {?}
     */
    selecteds : function() {
      var data = this._data;
      var popover = data._s;
      return popover.data();
    },
    /**
     * @param {?} prop
     * @return {undefined}
     */
    style : function(prop) {
      var data = this._data;
      var k = data._s;
      k.style(prop);
      this.update();
    },
    /**
     * @param {(Array|number)} v
     * @return {?}
     */
    scale : function(v) {
      return void 0 !== v && ($.isArray(v) ? this._scale = v : this._scale = [v, v], this._background({
        scale : this._scale[0]
      }), this.update()), this._scale[0];
    },
    /**
     * @param {string} obj
     * @return {undefined}
     */
    _background : function(obj) {
      if ("boolean" == typeof obj) {
        obj = {
          hide : !obj
        };
      } else {
        if ("string" == typeof obj) {
          obj = {
            type : obj
          };
        }
      }
      $.extend(this._bg, obj, true);
      delete this._bg.d;
    },
    /**
     * @param {number} walkers
     * @return {?}
     */
    background : function(walkers) {
      return void 0 === walkers ? this._bg : (this._background(walkers), void this.update());
    },
    /**
     * @param {string} type
     * @param {Function} one
     * @return {undefined}
     */
    on : function(type, one) {
      var obj = this._event;
      obj.on(type, one);
    }
  };
  /**
   * @param {string} opt_attributes
   * @return {?}
   */
  var createDom = function(opt_attributes) {
    return new init(opt_attributes);
  };
  return{
    /** @type {function (string): ?} */
    create : createDom
  };
});

!function(factory) {
  if ("object" == typeof exports) {
    module.exports = factory(window.jQuery);
  } else {
    if ("function" == typeof define && define.amd) {
      define(["jquery"], factory);
    } else {
      if (window.jQuery) {
        if (!window.jQuery.fn.colorpicker) {
          factory(window.jQuery);
        }
      }
    }
  }
}(function($) {
  /**
   * @param {string} val
   * @param {Object} source
   * @return {undefined}
   */
  var color = function(val, source) {
    this.value = {
      h : 0,
      s : 0,
      b : 0,
      a : 1
    };
    /** @type {null} */
    this.origFormat = null;
    if (source) {
      $.extend(this.colors, source);
    }
    if (val) {
      if (void 0 !== val.toLowerCase) {
        val += "";
        this.setColor(val);
      } else {
        if (void 0 !== val.h) {
          /** @type {string} */
          this.value = val;
        }
      }
    }
  };
  color.prototype = {
    /** @type {function (string, Object): undefined} */
    constructor : color,
    colors : {
      aliceblue : "#f0f8ff",
      antiquewhite : "#faebd7",
      aqua : "#00ffff",
      aquamarine : "#7fffd4",
      azure : "#f0ffff",
      beige : "#f5f5dc",
      bisque : "#ffe4c4",
      black : "#000000",
      blanchedalmond : "#ffebcd",
      blue : "#0000ff",
      blueviolet : "#8a2be2",
      brown : "#a52a2a",
      burlywood : "#deb887",
      cadetblue : "#5f9ea0",
      chartreuse : "#7fff00",
      chocolate : "#d2691e",
      coral : "#ff7f50",
      cornflowerblue : "#6495ed",
      cornsilk : "#fff8dc",
      crimson : "#dc143c",
      cyan : "#00ffff",
      darkblue : "#00008b",
      darkcyan : "#008b8b",
      darkgoldenrod : "#b8860b",
      darkgray : "#a9a9a9",
      darkgreen : "#006400",
      darkkhaki : "#bdb76b",
      darkmagenta : "#8b008b",
      darkolivegreen : "#556b2f",
      darkorange : "#ff8c00",
      darkorchid : "#9932cc",
      darkred : "#8b0000",
      darksalmon : "#e9967a",
      darkseagreen : "#8fbc8f",
      darkslateblue : "#483d8b",
      darkslategray : "#2f4f4f",
      darkturquoise : "#00ced1",
      darkviolet : "#9400d3",
      deeppink : "#ff1493",
      deepskyblue : "#00bfff",
      dimgray : "#696969",
      dodgerblue : "#1e90ff",
      firebrick : "#b22222",
      floralwhite : "#fffaf0",
      forestgreen : "#228b22",
      fuchsia : "#ff00ff",
      gainsboro : "#dcdcdc",
      ghostwhite : "#f8f8ff",
      gold : "#ffd700",
      goldenrod : "#daa520",
      gray : "#808080",
      green : "#008000",
      greenyellow : "#adff2f",
      honeydew : "#f0fff0",
      hotpink : "#ff69b4",
      indianred : "#cd5c5c",
      indigo : "#4b0082",
      ivory : "#fffff0",
      khaki : "#f0e68c",
      lavender : "#e6e6fa",
      lavenderblush : "#fff0f5",
      lawngreen : "#7cfc00",
      lemonchiffon : "#fffacd",
      lightblue : "#add8e6",
      lightcoral : "#f08080",
      lightcyan : "#e0ffff",
      lightgoldenrodyellow : "#fafad2",
      lightgrey : "#d3d3d3",
      lightgreen : "#90ee90",
      lightpink : "#ffb6c1",
      lightsalmon : "#ffa07a",
      lightseagreen : "#20b2aa",
      lightskyblue : "#87cefa",
      lightslategray : "#778899",
      lightsteelblue : "#b0c4de",
      lightyellow : "#ffffe0",
      lime : "#00ff00",
      limegreen : "#32cd32",
      linen : "#faf0e6",
      magenta : "#ff00ff",
      maroon : "#800000",
      mediumaquamarine : "#66cdaa",
      mediumblue : "#0000cd",
      mediumorchid : "#ba55d3",
      mediumpurple : "#9370d8",
      mediumseagreen : "#3cb371",
      mediumslateblue : "#7b68ee",
      mediumspringgreen : "#00fa9a",
      mediumturquoise : "#48d1cc",
      mediumvioletred : "#c71585",
      midnightblue : "#191970",
      mintcream : "#f5fffa",
      mistyrose : "#ffe4e1",
      moccasin : "#ffe4b5",
      navajowhite : "#ffdead",
      navy : "#000080",
      oldlace : "#fdf5e6",
      olive : "#808000",
      olivedrab : "#6b8e23",
      orange : "#ffa500",
      orangered : "#ff4500",
      orchid : "#da70d6",
      palegoldenrod : "#eee8aa",
      palegreen : "#98fb98",
      paleturquoise : "#afeeee",
      palevioletred : "#d87093",
      papayawhip : "#ffefd5",
      peachpuff : "#ffdab9",
      peru : "#cd853f",
      pink : "#ffc0cb",
      plum : "#dda0dd",
      powderblue : "#b0e0e6",
      purple : "#800080",
      red : "#ff0000",
      rosybrown : "#bc8f8f",
      royalblue : "#4169e1",
      saddlebrown : "#8b4513",
      salmon : "#fa8072",
      sandybrown : "#f4a460",
      seagreen : "#2e8b57",
      seashell : "#fff5ee",
      sienna : "#a0522d",
      silver : "#c0c0c0",
      skyblue : "#87ceeb",
      slateblue : "#6a5acd",
      slategray : "#708090",
      snow : "#fffafa",
      springgreen : "#00ff7f",
      steelblue : "#4682b4",
      tan : "#d2b48c",
      teal : "#008080",
      thistle : "#d8bfd8",
      tomato : "#ff6347",
      turquoise : "#40e0d0",
      violet : "#ee82ee",
      wheat : "#f5deb3",
      white : "#ffffff",
      whitesmoke : "#f5f5f5",
      yellow : "#ffff00",
      yellowgreen : "#9acd32",
      transparent : "transparent"
    },
    /**
     * @param {number} value
     * @return {?}
     */
    _sanitizeNumber : function(value) {
      return "number" == typeof value ? value : isNaN(value) || (null === value || ("" === value || void 0 === value)) ? 1 : "" === value ? 0 : void 0 !== value.toLowerCase ? (value.match(/^\./) && (value = "0" + value), Math.ceil(100 * parseFloat(value)) / 100) : 1;
    },
    /**
     * @param {string} x
     * @return {?}
     */
    isTransparent : function(x) {
      return x ? (x = x.toLowerCase().trim(), "transparent" === x || (x.match(/#?00000000/) || x.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/))) : false;
    },
    /**
     * @param {Object} obj
     * @return {?}
     */
    rgbaIsTransparent : function(obj) {
      return 0 === obj.r && (0 === obj.g && (0 === obj.b && 0 === obj.a));
    },
    /**
     * @param {string} to
     * @return {undefined}
     */
    setColor : function(to) {
      to = to.toLowerCase().trim();
      if (to) {
        if (this.isTransparent(to)) {
          this.value = {
            h : 0,
            s : 0,
            b : 0,
            a : 0
          };
        } else {
          this.value = this.stringToHSB(to) || {
            h : 0,
            s : 0,
            b : 0,
            a : 1
          };
        }
      }
    },
    /**
     * @param {string} color
     * @return {?}
     */
    stringToHSB : function(color) {
      color = color.toLowerCase();
      var param;
      if ("undefined" != typeof this.colors[color]) {
        color = this.colors[color];
        /** @type {string} */
        param = "alias";
      }
      var newArgs = this;
      /** @type {boolean} */
      var e = false;
      return $.each(this.stringParsers, function(dataAndEvents, parser) {
        var m = parser.re.exec(color);
        var self = m && parser.parse.apply(newArgs, [m]);
        var ret = param || (parser.format || "rgba");
        return self ? (e = ret.match(/hsla?/) ? newArgs.RGBtoHSB.apply(newArgs, newArgs.HSLtoRGB.apply(newArgs, self)) : newArgs.RGBtoHSB.apply(newArgs, self), newArgs.origFormat = ret, false) : true;
      }), e;
    },
    /**
     * @param {number} hsb
     * @return {undefined}
     */
    setHue : function(hsb) {
      /** @type {number} */
      this.value.h = 1 - hsb;
    },
    /**
     * @param {number} s
     * @return {undefined}
     */
    setSaturation : function(s) {
      /** @type {number} */
      this.value.s = s;
    },
    /**
     * @param {number} b
     * @return {undefined}
     */
    setBrightness : function(b) {
      /** @type {number} */
      this.value.b = 1 - b;
    },
    /**
     * @param {number} alpha
     * @return {undefined}
     */
    setAlpha : function(alpha) {
      /** @type {number} */
      this.value.a = Math.round(parseInt(100 * (1 - alpha), 10) / 100 * 100) / 100;
    },
    /**
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @param {number} deepDataAndEvents
     * @return {?}
     */
    toRGB : function(h, s, v, deepDataAndEvents) {
      if (!h) {
        h = this.value.h;
        s = this.value.s;
        v = this.value.b;
      }
      h *= 360;
      var num;
      var pos;
      var B;
      var X;
      var C;
      return h = h % 360 / 60, C = v * s, X = C * (1 - Math.abs(h % 2 - 1)), num = pos = B = v - C, h = ~~h, num += [C, X, 0, 0, X, C][h], pos += [X, C, C, X, 0, 0][h], B += [0, 0, X, C, C, X][h], {
        r : Math.round(255 * num),
        g : Math.round(255 * pos),
        b : Math.round(255 * B),
        a : deepDataAndEvents || this.value.a
      };
    },
    /**
     * @param {number} str
     * @param {number} s
     * @param {number} value
     * @param {number} deepDataAndEvents
     * @return {?}
     */
    toHex : function(str, s, value, deepDataAndEvents) {
      var rgb = this.toRGB(str, s, value, deepDataAndEvents);
      return this.rgbaIsTransparent(rgb) ? "transparent" : "#" + (1 << 24 | parseInt(rgb.r) << 16 | parseInt(rgb.g) << 8 | parseInt(rgb.b)).toString(16).substr(1);
    },
    /**
     * @param {number} h
     * @param {number} i
     * @param {number} dy
     * @param {number} state
     * @return {?}
     */
    toHSL : function(h, i, dy, state) {
      h = h || this.value.h;
      i = i || this.value.s;
      dy = dy || this.value.b;
      state = state || this.value.a;
      /** @type {number} */
      var key = h;
      /** @type {number} */
      var character = (2 - i) * dy;
      /** @type {number} */
      var n = i * dy;
      return n /= character > 0 && 1 >= character ? character : 2 - character, character /= 2, n > 1 && (n = 1), {
        h : isNaN(key) ? 0 : key,
        s : isNaN(n) ? 0 : n,
        l : isNaN(character) ? 0 : character,
        a : isNaN(state) ? 0 : state
      };
    },
    /**
     * @param {number} str
     * @param {number} s
     * @param {number} isXML
     * @param {number} deepDataAndEvents
     * @return {?}
     */
    toAlias : function(str, s, isXML, deepDataAndEvents) {
      var h = this.toHex(str, s, isXML, deepDataAndEvents);
      var color;
      for (color in this.colors) {
        if (this.colors[color] === h) {
          return color;
        }
      }
      return false;
    },
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} isXML
     * @return {?}
     */
    RGBtoHSB : function(r, g, b, isXML) {
      r /= 255;
      g /= 255;
      b /= 255;
      var udataCur;
      var scale;
      var V;
      var C;
      return V = Math.max(r, g, b), C = V - Math.min(r, g, b), udataCur = 0 === C ? null : V === r ? (g - b) / C : V === g ? (b - r) / C + 2 : (r - g) / C + 4, udataCur = (udataCur + 360) % 6 * 60 / 360, scale = 0 === C ? 0 : C / V, {
        h : this._sanitizeNumber(udataCur),
        s : scale,
        b : V,
        a : this._sanitizeNumber(isXML)
      };
    },
    /**
     * @param {number} m1
     * @param {number} m2
     * @param {number} value
     * @return {?}
     */
    HueToRGB : function(m1, m2, value) {
      return 0 > value ? value += 1 : value > 1 && (value -= 1), 1 > 6 * value ? m1 + (m2 - m1) * value * 6 : 1 > 2 * value ? m2 : 2 > 3 * value ? m1 + (m2 - m1) * (2 / 3 - value) * 6 : m1;
    },
    /**
     * @param {number} dataAndEvents
     * @param {number} saturation
     * @param {number} lightness
     * @param {number} isXML
     * @return {?}
     */
    HSLtoRGB : function(dataAndEvents, saturation, lightness, isXML) {
      if (0 > saturation) {
        /** @type {number} */
        saturation = 0;
      }
      var m2;
      /** @type {number} */
      m2 = 0.5 >= lightness ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      /** @type {number} */
      var m1 = 2 * lightness - m2;
      var pdataOld = dataAndEvents + 1 / 3;
      /** @type {number} */
      var pdataCur = dataAndEvents;
      /** @type {number} */
      var udataCur = dataAndEvents - 1 / 3;
      /** @type {number} */
      var j = Math.round(255 * this.HueToRGB(m1, m2, pdataOld));
      /** @type {number} */
      var k = Math.round(255 * this.HueToRGB(m1, m2, pdataCur));
      /** @type {number} */
      var l = Math.round(255 * this.HueToRGB(m1, m2, udataCur));
      return[j, k, l, this._sanitizeNumber(isXML)];
    },
    /**
     * @param {string} format
     * @return {?}
     */
    toString : function(format) {
      format = format || "rgba";
      /** @type {boolean} */
      var out = false;
      switch(format) {
        case "rgb":
          return out = this.toRGB(), this.rgbaIsTransparent(out) ? "transparent" : "rgb(" + out.r + "," + out.g + "," + out.b + ")";
        case "rgba":
          return out = this.toRGB(), "rgba(" + out.r + "," + out.g + "," + out.b + "," + out.a + ")";
        case "hsl":
          return out = this.toHSL(), "hsl(" + Math.round(360 * out.h) + "," + Math.round(100 * out.s) + "%," + Math.round(100 * out.l) + "%)";
        case "hsla":
          return out = this.toHSL(), "hsla(" + Math.round(360 * out.h) + "," + Math.round(100 * out.s) + "%," + Math.round(100 * out.l) + "%," + out.a + ")";
        case "hex":
          return this.toHex();
        case "alias":
          return this.toAlias() || this.toHex();
        default:
          return out;
      }
    },
    stringParsers : [{
      re : /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
      format : "rgb",
      /**
       * @param {(Array|Float32Array)} opt_attributes
       * @return {?}
       */
      parse : function(opt_attributes) {
        return[opt_attributes[1], opt_attributes[2], opt_attributes[3], 1];
      }
    }, {
      re : /rgb\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
      format : "rgb",
      /**
       * @param {(Array|Float32Array)} opt_attributes
       * @return {?}
       */
      parse : function(opt_attributes) {
        return[2.55 * opt_attributes[1], 2.55 * opt_attributes[2], 2.55 * opt_attributes[3], 1];
      }
    }, {
      re : /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format : "rgba",
      /**
       * @param {Array} opt_attributes
       * @return {?}
       */
      parse : function(opt_attributes) {
        return[opt_attributes[1], opt_attributes[2], opt_attributes[3], opt_attributes[4]];
      }
    }, {
      re : /rgba\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format : "rgba",
      /**
       * @param {Array} opt_attributes
       * @return {?}
       */
      parse : function(opt_attributes) {
        return[2.55 * opt_attributes[1], 2.55 * opt_attributes[2], 2.55 * opt_attributes[3], opt_attributes[4]];
      }
    }, {
      re : /hsl\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
      format : "hsl",
      /**
       * @param {Array} opt_attributes
       * @return {?}
       */
      parse : function(opt_attributes) {
        return[opt_attributes[1] / 360, opt_attributes[2] / 100, opt_attributes[3] / 100, opt_attributes[4]];
      }
    }, {
      re : /hsla\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format : "hsla",
      /**
       * @param {Array} opt_attributes
       * @return {?}
       */
      parse : function(opt_attributes) {
        return[opt_attributes[1] / 360, opt_attributes[2] / 100, opt_attributes[3] / 100, opt_attributes[4]];
      }
    }, {
      re : /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
      format : "hex",
      /**
       * @param {(Array|Float32Array)} execResult
       * @return {?}
       */
      parse : function(execResult) {
        return[parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16), 1];
      }
    }, {
      re : /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
      format : "hex",
      /**
       * @param {(Array|Float32Array)} execResult
       * @return {?}
       */
      parse : function(execResult) {
        return[parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16), 1];
      }
    }],
    /**
     * @param {Object} m3
     * @return {?}
     */
    colorNameToHex : function(m3) {
      return "undefined" != typeof this.colors[m3.toLowerCase()] ? this.colors[m3.toLowerCase()] : false;
    }
  };
  var defaults = {
    horizontal : false,
    inline : false,
    color : false,
    format : false,
    input : "input",
    container : false,
    component : ".add-on, .input-group-addon",
    sliders : {
      saturation : {
        maxLeft : 100,
        maxTop : 100,
        callLeft : "setSaturation",
        callTop : "setBrightness"
      },
      hue : {
        maxLeft : 0,
        maxTop : 100,
        callLeft : false,
        callTop : "setHue"
      },
      alpha : {
        maxLeft : 0,
        maxTop : 100,
        callLeft : false,
        callTop : "setAlpha"
      }
    },
    slidersHorz : {
      saturation : {
        maxLeft : 100,
        maxTop : 100,
        callLeft : "setSaturation",
        callTop : "setBrightness"
      },
      hue : {
        maxLeft : 100,
        maxTop : 0,
        callLeft : "setHue",
        callTop : false
      },
      alpha : {
        maxLeft : 100,
        maxTop : 0,
        callLeft : "setAlpha",
        callTop : false
      }
    },
    template : '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>',
    align : "right",
    customClass : null,
    colorSelectors : null
  };
  /**
   * @param {string} option
   * @param {?} options
   * @return {undefined}
   */
  var init = function(option, options) {
    if (this.element = $(option).addClass("colorpicker-element"), this.options = $.extend(true, {}, defaults, this.element.data(), options), this.component = this.options.component, this.component = this.component !== false ? this.element.find(this.component) : false, this.component && (0 === this.component.length && (this.component = false)), this.container = this.options.container === true ? this.element : this.options.container, this.container = this.container !== false ? $(this.container) : false, 
    this.input = this.element.is("input") ? this.element : this.options.input ? this.element.find(this.options.input) : false, this.input && (0 === this.input.length && (this.input = false)), this.color = new color(this.options.color !== false ? this.options.color : this.getValue(), this.options.colorSelectors), this.format = this.options.format !== false ? this.options.format : this.color.origFormat, this.options.color !== false && (this.updateInput(this.color), this.updateData(this.color)), this.picker = 
    $(this.options.template), this.options.customClass && this.picker.addClass(this.options.customClass), this.options.inline ? this.picker.addClass("colorpicker-inline colorpicker-visible") : this.picker.addClass("colorpicker-hidden"), this.options.horizontal && this.picker.addClass("colorpicker-horizontal"), "rgba" !== this.format && ("hsla" !== this.format && this.options.format !== false) || this.picker.addClass("colorpicker-with-alpha"), "right" === this.options.align && this.picker.addClass("colorpicker-right"), 
    this.options.inline === true && this.picker.addClass("colorpicker-no-arrow"), this.options.colorSelectors) {
      var t = this;
      $.each(this.options.colorSelectors, function(index, value) {
        var current = $("<i />").css("background-color", value).data("class", index);
        current.click(function() {
          t.setValue($(this).css("background-color"));
        });
        t.picker.find(".colorpicker-selectors").append(current);
      });
      this.picker.find(".colorpicker-selectors").show();
    }
    this.picker.on("mousedown.colorpicker touchstart.colorpicker", $.proxy(this.mousedown, this));
    this.picker.appendTo(this.container ? this.container : $("body"));
    if (this.input !== false) {
      this.input.on({
        "keyup.colorpicker" : $.proxy(this.keyup, this)
      });
      this.input.on({
        "change.colorpicker" : $.proxy(this.change, this)
      });
      if (this.component === false) {
        this.element.on({
          "focus.colorpicker" : $.proxy(this.show, this)
        });
      }
      if (this.options.inline === false) {
        this.element.on({
          "focusout.colorpicker" : $.proxy(this.hide, this)
        });
      }
    }
    if (this.component !== false) {
      this.component.on({
        "click.colorpicker" : $.proxy(this.show, this)
      });
    }
    if (this.input === false) {
      if (this.component === false) {
        this.element.on({
          "click.colorpicker" : $.proxy(this.show, this)
        });
      }
    }
    if (this.input !== false) {
      if (this.component !== false) {
        if ("color" === this.input.attr("type")) {
          this.input.on({
            "click.colorpicker" : $.proxy(this.show, this),
            "focus.colorpicker" : $.proxy(this.show, this)
          });
        }
      }
    }
    this.update();
    $($.proxy(function() {
      this.element.trigger("create");
    }, this));
  };
  /** @type {function (string, Object): undefined} */
  init.Color = color;
  init.prototype = {
    /** @type {function (string, ?): undefined} */
    constructor : init,
    /**
     * @return {undefined}
     */
    destroy : function() {
      this.picker.remove();
      this.element.removeData("colorpicker", "color").off(".colorpicker");
      if (this.input !== false) {
        this.input.off(".colorpicker");
      }
      if (this.component !== false) {
        this.component.off(".colorpicker");
      }
      this.element.removeClass("colorpicker-element");
      this.element.trigger({
        type : "destroy"
      });
    },
    /**
     * @return {?}
     */
    reposition : function() {
      if (this.options.inline !== false || this.options.container) {
        return false;
      }
      /** @type {string} */
      var NODE_TYPE = this.container && this.container[0] !== document.body ? "position" : "offset";
      var element = this.component || this.element;
      var iniPos = element[NODE_TYPE]();
      if ("right" === this.options.align) {
        iniPos.left -= this.picker.outerWidth() - element.outerWidth();
      }
      this.picker.css({
        top : iniPos.top + element.outerHeight(),
        left : iniPos.left
      });
    },
    /**
     * @param {?} event
     * @return {?}
     */
    show : function(event) {
      return this.isDisabled() ? false : (this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"), this.reposition(), $(window).on("resize.colorpicker", $.proxy(this.reposition, this)), !event || (this.hasInput() && "color" !== this.input.attr("type") || event.stopPropagation && (event.preventDefault && (event.stopPropagation(), event.preventDefault()))), !this.component && this.input || (this.options.inline !== false || $(window.document).on({
        "mousedown.colorpicker" : $.proxy(this.hide, this)
      })), void this.element.trigger({
        type : "showPicker",
        color : this.color
      }));
    },
    /**
     * @return {undefined}
     */
    hide : function() {
      this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible");
      $(window).off("resize.colorpicker", this.reposition);
      $(document).off({
        "mousedown.colorpicker" : this.hide
      });
      this.update();
      this.element.trigger({
        type : "hidePicker",
        color : this.color
      });
    },
    /**
     * @param {(Element|string)} data
     * @return {?}
     */
    updateData : function(data) {
      return data = data || this.color.toString(this.format), this.element.data("color", data), data;
    },
    /**
     * @param {string} value
     * @return {?}
     */
    updateInput : function(value) {
      if (value = value || this.color.toString(this.format), this.input !== false) {
        if (this.options.colorSelectors) {
          var tokenizer = new color(value, this.options.colorSelectors);
          var w = tokenizer.toAlias();
          if ("undefined" != typeof this.options.colorSelectors[w]) {
            value = w;
          }
        }
        this.input.prop("value", value);
      }
      return value;
    },
    /**
     * @param {string} dataAndEvents
     * @return {?}
     */
    updatePicker : function(dataAndEvents) {
      if (void 0 !== dataAndEvents) {
        this.color = new color(dataAndEvents, this.options.colorSelectors);
      }
      var options = this.options.horizontal === false ? this.options.sliders : this.options.slidersHorz;
      var all = this.picker.find("i");
      return 0 !== all.length ? (this.options.horizontal === false ? (options = this.options.sliders, all.eq(1).css("top", options.hue.maxTop * (1 - this.color.value.h)).end().eq(2).css("top", options.alpha.maxTop * (1 - this.color.value.a))) : (options = this.options.slidersHorz, all.eq(1).css("left", options.hue.maxLeft * (1 - this.color.value.h)).end().eq(2).css("left", options.alpha.maxLeft * (1 - this.color.value.a))), all.eq(0).css({
        top : options.saturation.maxTop - this.color.value.b * options.saturation.maxTop,
        left : this.color.value.s * options.saturation.maxLeft
      }), this.picker.find(".colorpicker-saturation").css("backgroundColor", this.color.toHex(this.color.value.h, 1, 1, 1)), this.picker.find(".colorpicker-alpha").css("backgroundColor", this.color.toHex()), this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor", this.color.toString(this.format)), dataAndEvents) : void 0;
    },
    /**
     * @param {string} orig
     * @return {?}
     */
    updateComponent : function(orig) {
      if (orig = orig || this.color.toString(this.format), this.component !== false) {
        var bar = this.component.find("i").eq(0);
        if (bar.length > 0) {
          bar.css({
            backgroundColor : orig
          });
        } else {
          this.component.css({
            backgroundColor : orig
          });
        }
      }
      return orig;
    },
    /**
     * @param {Object} recurring
     * @return {?}
     */
    update : function(recurring) {
      var pdataCur;
      return this.getValue(false) === false && recurring !== true || (pdataCur = this.updateComponent(), this.updateInput(pdataCur), this.updateData(pdataCur), this.updatePicker()), pdataCur;
    },
    /**
     * @param {string} val
     * @return {undefined}
     */
    setValue : function(val) {
      this.color = new color(val, this.options.colorSelectors);
      this.update(true);
      this.element.trigger({
        type : "changeColor",
        color : this.color,
        value : val
      });
    },
    /**
     * @param {Object} value
     * @return {?}
     */
    getValue : function(value) {
      value = void 0 === value ? "#000000" : value;
      var val;
      return val = this.hasInput() ? this.input.val() : this.element.data("color"), void 0 !== val && ("" !== val && null !== val) || (val = value), val;
    },
    /**
     * @return {?}
     */
    hasInput : function() {
      return this.input !== false;
    },
    /**
     * @return {?}
     */
    isDisabled : function() {
      return this.hasInput() ? this.input.prop("disabled") === true : false;
    },
    /**
     * @return {?}
     */
    disable : function() {
      return this.hasInput() ? (this.input.prop("disabled", true), this.element.trigger({
        type : "disable",
        color : this.color,
        value : this.getValue()
      }), true) : false;
    },
    /**
     * @return {?}
     */
    enable : function() {
      return this.hasInput() ? (this.input.prop("disabled", false), this.element.trigger({
        type : "enable",
        color : this.color,
        value : this.getValue()
      }), true) : false;
    },
    currentSlider : null,
    mousePointer : {
      left : 0,
      top : 0
    },
    /**
     * @param {Object} event
     * @return {?}
     */
    mousedown : function(event) {
      if (!event.pageX) {
        if (!event.pageY) {
          if (event.originalEvent) {
            if (event.originalEvent.touches) {
              event.pageX = event.originalEvent.touches[0].pageX;
              event.pageY = event.originalEvent.touches[0].pageY;
            }
          }
        }
      }
      event.stopPropagation();
      event.preventDefault();
      var button = $(event.target);
      var el = button.closest("div");
      var item = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
      if (!el.is(".colorpicker")) {
        if (el.is(".colorpicker-saturation")) {
          this.currentSlider = $.extend({}, item.saturation);
        } else {
          if (el.is(".colorpicker-hue")) {
            this.currentSlider = $.extend({}, item.hue);
          } else {
            if (!el.is(".colorpicker-alpha")) {
              return false;
            }
            this.currentSlider = $.extend({}, item.alpha);
          }
        }
        var nodeOfs = el.offset();
        this.currentSlider.guide = el.find("i")[0].style;
        /** @type {number} */
        this.currentSlider.left = event.pageX - nodeOfs.left;
        /** @type {number} */
        this.currentSlider.top = event.pageY - nodeOfs.top;
        this.mousePointer = {
          left : event.pageX,
          top : event.pageY
        };
        $(document).on({
          "mousemove.colorpicker" : $.proxy(this.mousemove, this),
          "touchmove.colorpicker" : $.proxy(this.mousemove, this),
          "mouseup.colorpicker" : $.proxy(this.mouseup, this),
          "touchend.colorpicker" : $.proxy(this.mouseup, this)
        }).trigger("mousemove");
      }
      return false;
    },
    /**
     * @param {Object} ev
     * @return {?}
     */
    mousemove : function(ev) {
      if (!ev.pageX) {
        if (!ev.pageY) {
          if (ev.originalEvent) {
            if (ev.originalEvent.touches) {
              ev.pageX = ev.originalEvent.touches[0].pageX;
              ev.pageY = ev.originalEvent.touches[0].pageY;
            }
          }
        }
      }
      ev.stopPropagation();
      ev.preventDefault();
      /** @type {number} */
      var v = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((ev.pageX || this.mousePointer.left) - this.mousePointer.left)));
      /** @type {number} */
      var newTop = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((ev.pageY || this.mousePointer.top) - this.mousePointer.top)));
      return this.currentSlider.guide.left = v + "px", this.currentSlider.guide.top = newTop + "px", this.currentSlider.callLeft && this.color[this.currentSlider.callLeft].call(this.color, v / this.currentSlider.maxLeft), this.currentSlider.callTop && this.color[this.currentSlider.callTop].call(this.color, newTop / this.currentSlider.maxTop), "setAlpha" === this.currentSlider.callTop && (this.options.format === false && (1 !== this.color.value.a ? (this.format = "rgba", this.color.origFormat = "rgba") : 
      (this.format = "hex", this.color.origFormat = "hex"))), this.update(true), this.element.trigger({
        type : "changeColor",
        color : this.color
      }), false;
    },
    /**
     * @param {?} event
     * @return {?}
     */
    mouseup : function(event) {
      return event.stopPropagation(), event.preventDefault(), $(document).off({
        "mousemove.colorpicker" : this.mousemove,
        "touchmove.colorpicker" : this.mousemove,
        "mouseup.colorpicker" : this.mouseup,
        "touchend.colorpicker" : this.mouseup
      }), false;
    },
    /**
     * @param {Object} e
     * @return {undefined}
     */
    change : function(e) {
      this.keyup(e);
    },
    /**
     * @param {Object} e
     * @return {undefined}
     */
    keyup : function(e) {
      if (38 === e.keyCode) {
        if (this.color.value.a < 1) {
          /** @type {number} */
          this.color.value.a = Math.round(100 * (this.color.value.a + 0.01)) / 100;
        }
        this.update(true);
      } else {
        if (40 === e.keyCode) {
          if (this.color.value.a > 0) {
            /** @type {number} */
            this.color.value.a = Math.round(100 * (this.color.value.a - 0.01)) / 100;
          }
          this.update(true);
        } else {
          this.color = new color(this.input.val(), this.options.colorSelectors);
          if (this.color.origFormat) {
            if (this.options.format === false) {
              this.format = this.color.origFormat;
            }
          }
          if (this.getValue(false) !== false) {
            this.updateData();
            this.updateComponent();
            this.updatePicker();
          }
        }
      }
      this.element.trigger({
        type : "changeColor",
        color : this.color,
        value : this.input.val()
      });
    }
  };
  /** @type {function (string, ?): undefined} */
  $.colorpicker = init;
  /**
   * @param {string} fn
   * @return {?}
   */
  $.fn.colorpicker = function(fn) {
    /** @type {Arguments} */
    var args = arguments;
    /** @type {null} */
    var i = null;
    var items = this.each(function() {
      var cal = $(this);
      var arr = cal.data("colorpicker");
      var method = "object" == typeof fn ? fn : {};
      if (arr || "string" == typeof fn) {
        if ("string" == typeof fn) {
          i = arr[fn].apply(arr, Array.prototype.slice.call(args, 1));
        }
      } else {
        cal.data("colorpicker", new init(this, method));
      }
    });
    return "getValue" === fn ? i : items;
  };
  /** @type {function (string, ?): undefined} */
  $.fn.colorpicker.constructor = init;
});

!function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery", "bootstrap-colorpicker"], factory);
  } else {
    if (window.jQuery) {
      if (!window.jQuery.fn.colorpickerplus) {
        factory(window.jQuery);
      }
    }
  }
}(function($) {
  /** @type {Array} */
  var m = ["#5B0F00", "#660000", "#783F04", "#7F6000", "#274E13", "#0C343D", "#1C4587", "#073763", "#20124D", "#4C1130", "#5B0F00", "#660000", "#783F04", "#7F6000", "#274E13", "#0C343D", "#1C4587", "#073763", "#20124D", "#4C1130", "#85200C", "#990000", "#B45F06", "#BF9000", "#38761D", "#134F5C", "#1155CC", "#0B5394", "#351C75", "#741B47", "#A61C00", "#CC0000", "#E69138", "#F1C232", "#6AA84F", "#45818E", "#3C78D8", "#3D85C6", "#674EA7", "#A64D79", "#CC4125", "#E06666", "#F6B26B", "#FFD966", "#93C47D", 
  "#76A5AF", "#6D9EEB", "#6FA8DC", "#8E7CC3", "#C27BA0", "#DD7E6B", "#EA9999", "#F9CB9C", "#FFE599", "#B6D7A8", "#A2C4C9", "#A4C2F4", "#9FC5E8", "#B4A7D6", "#D5A6BD", "#E6B8AF", "#F4CCCC", "#FCE5CD", "#FFF2CC", "#D9EAD3", "#D0E0E3", "#C9DAF8", "#CFE2F3", "#D9D2E9", "#EAD1DC", "#980000", "#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#00FFFF", "#4A86E8", "#0000FF", "#9900FF", "#FF00FF", "#000000", "#222222", "#444444", "#666666", "#888888", "#AAAAAA", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"];
  /** @type {(Storage|null)} */
  var tStorageObj = window.localStorage;
  /** @type {Array} */
  var s = [];
  if (tStorageObj) {
    if (!tStorageObj.getItem("colorpickerplus_custom_colors")) {
      tStorageObj.setItem("colorpickerplus_custom_colors", s.join("$"));
    }
    /** @type {Array.<string>} */
    s = tStorageObj.getItem("colorpickerplus_custom_colors").split("$");
  }
  /** @type {number} */
  var phaseX = 9;
  /** @type {number} */
  var width = 10;
  /**
   * @param {?} value
   * @param {Object} next
   * @return {?}
   */
  var success = function(value, next) {
    return next || (next = $('<div class="colorcell"></div>')), value ? (next.data("color", value), next.css("background-color", value)) : next.addClass("colorpicker-color"), next;
  };
  /**
   * @param {string} element
   * @return {undefined}
   */
  var init = function(element) {
    var button = $(element);
    /** @type {number} */
    var l = Math.max(Math.ceil(s.length / width), 1);
    /** @type {null} */
    var label = null;
    /** @type {number} */
    var i = 0;
    for (;l > i;i++) {
      label = $(i === l - 1 ? '<div class="colorpickerplus-custom-colors"></div>' : '<div class="colorpickerplus-colors-row"></div>');
      /** @type {number} */
      var x = 0;
      for (;width > x;x++) {
        /** @type {number} */
        var k = i * width + x;
        /** @type {null} */
        var name = null;
        if (0 === k) {
          name = success();
        } else {
          if (k < s.length) {
            var v = s[k];
            name = success(v);
          } else {
            name = $('<div class="nonecell"></div>');
          }
        }
        name.appendTo(label);
      }
      label.appendTo(button);
    }
    /** @type {number} */
    i = 0;
    for (;phaseX > i;i++) {
      /** @type {null} */
      label = null;
      if (phaseX - 2 > i) {
        label = $('<div class="colorpickerplus-colors-row"></div>');
      } else {
        if (i === phaseX - 2) {
          $('<div class="colorpickerplus-custom-colors"></div>').appendTo(button);
        }
        label = $('<div class="colorpickerplus-colors-row"></div>');
      }
      /** @type {number} */
      var j = 0;
      for (;width > j;j++) {
        var value = m[i * width + j];
        success(value).appendTo(label);
      }
      label.appendTo(button);
    }
    var form = $('<div class="input-group input-group-sm"><input type="text" class="form-control"/><span class="input-group-btn"><button class="btn btn-default" type="button" title="Custom Color">C</button></span></div>');
    var $input = $("input", form);
    form.appendTo(button);
    button.on("click.colorpickerplus-container", ".colorcell", $.proxy(this.select, this));
    form.on("click.colorpickerplus-container", "button", $.proxy(this.custom, this));
    $input.on("changeColor.colorpickerplus-container", $.proxy(this.change, this));
    button.on("click", $.proxy(this.stopPropagation, this));
    $input.colorpicker();
    /** @type {string} */
    this.element = element;
    this.colorInput = $input[0];
  };
  init.prototype = {
    /** @type {function (string): undefined} */
    constructor : init,
    /**
     * @return {undefined}
     */
    custom : function() {
      var elem = $(this.element);
      var text = $(this.colorInput).val();
      s[s.length] = text;
      var target = $(".nonecell", elem);
      var code = success(text, target.first());
      code.removeClass("nonecell");
      code.addClass("colorcell");
      tStorageObj.setItem("colorpickerplus_custom_colors", s.join("$"));
    },
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    select : function(ev) {
      var obj = $(this.element);
      var recurring = $(ev.target).data("color");
      if (null == recurring) {
        obj.trigger("changeColor", [recurring]);
      } else {
        var element = $(this.colorInput);
        element.val(recurring);
        element.colorpicker("setValue", recurring);
        this.update(recurring);
      }
      obj.trigger("select", [recurring]);
      $(this.colorInput).colorpicker("hide");
    },
    /**
     * @param {Object} ev
     * @return {undefined}
     */
    change : function(ev) {
      var $elem = $(this.element);
      ev.stopPropagation();
      $elem.trigger("changeColor", [ev.color.toHex()]);
    },
    /**
     * @param {Object} recurring
     * @return {undefined}
     */
    update : function(recurring) {
      var elem = $(this.element);
      var target = $(".colorcell", elem);
      if (target.removeClass("selected"), null != recurring) {
        var content = $(this.colorInput);
        content.val(recurring);
      }
      target.each(function() {
        var m = $(this).data("color");
        return null != recurring && m === recurring.toUpperCase() ? ($(this).addClass("selected"), false) : void 0;
      });
    },
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    stopPropagation : function(ev) {
      var revisionCheckbox = $(ev.target);
      if (!revisionCheckbox.is(".colorcell")) {
        ev.stopPropagation();
      }
    }
  };
  /** @type {function (string): undefined} */
  $.colorpickerembed = init;
  /**
   * @param {string} fn
   * @return {?}
   */
  $.fn.colorpickerembed = function(fn) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var $spy = $(this);
      var defaultProcessor = $spy.data("colorpickerembed");
      var method = "object" == typeof fn ? fn : {};
      if (defaultProcessor || "string" == typeof fn) {
        if ("string" == typeof fn) {
          defaultProcessor[fn].apply(defaultProcessor, Array.prototype.slice.call(args, 1));
        }
      } else {
        $spy.data("colorpickerembed", new init(this, method));
      }
    });
  };
  /** @type {function (string): undefined} */
  $.fn.colorpickerembed.constructor = init;
  var el = $(".colorpickerplus");
  if (el.length <= 0) {
    el = $('<div class="colorpickerplus"></div>');
    el.appendTo($("body"));
  }
  var obj = $('<div class="colorpickerplus-container"></div>').appendTo(el);
  obj.colorpickerembed();
  /** @type {null} */
  var scope = null;
  obj.on("changeColor", function(dataAndEvents, newVal) {
    if (scope) {
      scope.setValue(newVal);
    }
  });
  obj.on("select", function() {
    if (scope) {
      _show();
    }
  });
  /**
   * @param {Object} root
   * @return {undefined}
   */
  var update = function(root) {
    obj.data("colorpickerembed").update(root.getValue());
    /** @type {Object} */
    scope = root;
    el.show();
  };
  /**
   * @return {undefined}
   */
  var _show = function() {
    el.hide();
    /** @type {null} */
    scope = null;
  };
  /**
   * @param {Object} e
   * @return {undefined}
   */
  var position = function(e) {
    var iframe = $(e.element);
    var pos = iframe.offset();
    pos.top += iframe.outerHeight();
    el.css(pos);
  };
  var defaults = {};
  /**
   * @param {string} element
   * @param {?} options
   * @return {undefined}
   */
  var Plugin = function(element, options) {
    var input = $(element);
    this.options = $.extend({}, defaults, input.data(), options);
    var streams = input.is("input") ? input : this.options.input ? input.find(this.options.input) : false;
    if (streams) {
      if (0 === streams.length) {
        /** @type {boolean} */
        streams = false;
      }
    }
    if (streams !== false) {
      input.on("focus", $.proxy(this.show, this));
      this.input = streams[0];
    }
    if (streams === false) {
      input.on("click", $.proxy(this.show, this));
    }
    /** @type {string} */
    this.element = element;
  };
  /** @type {string} */
  Plugin.version = "0.1.0";
  Plugin.prototype = {
    /** @type {function (string, ?): undefined} */
    constructor : Plugin,
    /**
     * @return {undefined}
     */
    destroy : function() {
      var $elem = $(this.element);
      $elem.removeData("colorpickerplus").off(".colorpickerplus");
      if (this.input !== false) {
        $(this.input).off(".colorpickerplus");
      }
      $elem.trigger("destroy");
    },
    /**
     * @return {undefined}
     */
    reposition : function() {
      position(this);
    },
    /**
     * @return {undefined}
     */
    show : function() {
      var $elem = $(this.element);
      this.reposition();
      $(window).on("resize.colorpickerplus", $.proxy(this.reposition, this));
      $(window.document.body).on("mouseup.colorpickerplus", $.proxy(this.hide, this));
      update(this);
      $elem.trigger("showPicker", [this.getValue()]);
    },
    /**
     * @param {Event} e
     * @return {undefined}
     */
    hide : function(e) {
      var $elem = $(this.element);
      var $el = $(e.target);
      var codeSegments = $el.closest(".colorpicker, .colorpickerplus");
      if (!(codeSegments.length > 0)) {
        if (!$el.is("input")) {
          _show();
          $(window).off("resize.colorpickerplus");
          $(window.document.body).off("mouseup.colorpickerplus");
          $elem.trigger("hidePicker", [this.getValue()]);
        }
      }
    },
    /**
     * @param {string} val
     * @return {undefined}
     */
    setValue : function(val) {
      var $el = $(this.element);
      if (val) {
        $el.data("cpp-color", val);
      } else {
        $el.removeData("cpp-color");
      }
      $el.trigger("changeColor", [val]);
    },
    /**
     * @param {Object} defaultValue
     * @return {?}
     */
    getValue : function(defaultValue) {
      var $elem = $(this.element);
      defaultValue = void 0 === defaultValue ? "#000000" : defaultValue;
      var value;
      return value = this.hasInput() ? $(this.input).val() : $elem.data("cpp-color"), (void 0 === value || ("" === value || null === value)) && (value = defaultValue), "string" == typeof value ? value.toUpperCase() : value;
    },
    /**
     * @return {?}
     */
    hasInput : function() {
      return this.input !== false;
    }
  };
  /** @type {function (string, ?): undefined} */
  $.colorpickerplus = Plugin;
  /**
   * @param {string} fn
   * @return {?}
   */
  $.fn.colorpickerplus = function(fn) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var $el = $(this);
      var defaultProcessor = $el.data("colorpickerplus");
      var options = "object" == typeof fn ? fn : {};
      if (defaultProcessor || "string" == typeof fn) {
        if ("string" == typeof fn) {
          defaultProcessor[fn].apply(defaultProcessor, Array.prototype.slice.call(args, 1));
        }
      } else {
        $el.data("colorpickerplus", new Plugin(this, options));
      }
    });
  };
  /** @type {function (string, ?): undefined} */
  $.fn.colorpickerplus.constructor = Plugin;
});

!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(window.jQuery);
    }
  }
}(this, function($) {
  /** @type {Array} */
  var vals = [{
    strokeStyle : "#000",
    lw : 2,
    fillStyle : null,
    text : {
      fill : "#000"
    }
  }, {
    strokeStyle : "#428bca",
    lw : 2,
    fillStyle : null,
    text : {
      fill : "#000"
    }
  }, {
    strokeStyle : "#5cb85c",
    lw : 2,
    fillStyle : null,
    text : {
      fill : "#000"
    }
  }, {
    strokeStyle : "#5bc0de",
    lw : 2,
    fillStyle : null,
    text : {
      fill : "#000"
    }
  }, {
    strokeStyle : "#f0ad4e",
    lw : 2,
    fillStyle : null,
    text : {
      fill : "#000"
    }
  }, {
    strokeStyle : "#d9534f",
    lw : 2,
    fillStyle : null,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : "#000",
    strokeStyle : "#000",
    lw : 2,
    text : {
      fill : "#fff"
    }
  }, {
    fillStyle : "#428bca",
    strokeStyle : "#2069a8",
    lw : 2,
    text : {
      fill : "#fff"
    }
  }, {
    fillStyle : "#5cb85c",
    strokeStyle : "#2a9529",
    lw : 2,
    text : {
      fill : "#fff"
    }
  }, {
    fillStyle : "#5bc0de",
    strokeStyle : "#17809a",
    lw : 2,
    text : {
      fill : "#fff"
    }
  }, {
    fillStyle : "#f0ad4e",
    strokeStyle : "#a06909",
    lw : 2,
    text : {
      fill : "#fff"
    }
  }, {
    fillStyle : "#d9534f",
    strokeStyle : "#95100a",
    lw : 2,
    text : {
      fill : "#fff"
    }
  }, {
    fillStyle : "#000",
    strokeStyle : "#fff",
    lw : 3,
    text : {
      fill : "#fff"
    },
    shadow : [3, 3, 3]
  }, {
    fillStyle : "#428bca",
    strokeStyle : "#fff",
    lw : 3,
    text : {
      fill : "#fff"
    },
    shadow : [3, 3, 3]
  }, {
    fillStyle : "#5cb85c",
    strokeStyle : "#fff",
    lw : 3,
    text : {
      fill : "#fff"
    },
    shadow : [3, 3, 3]
  }, {
    fillStyle : "#5bc0de",
    strokeStyle : "#fff",
    lw : 3,
    text : {
      fill : "#fff"
    },
    shadow : [3, 3, 3]
  }, {
    fillStyle : "#f0ad4e",
    strokeStyle : "#fff",
    lw : 3,
    text : {
      fill : "#fff"
    },
    shadow : [3, 3, 3]
  }, {
    fillStyle : "#d9534f",
    strokeStyle : "#fff",
    lw : 3,
    text : {
      fill : "#fff"
    },
    shadow : [3, 3, 3]
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#fff", 95, "#aeaeae"]
    },
    shadow : [2, 2, 2],
    strokeStyle : "#000",
    lw : 2,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#c6ffff", 95, "#467fbe"]
    },
    shadow : [2, 2, 2],
    strokeStyle : "#2069a8",
    lw : 2,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#ffffff", 95, "#8fbf8f"]
    },
    shadow : [2, 2, 2],
    strokeStyle : "#2a9529",
    lw : 2,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#dff4ff", 95, "#5fb4bf"]
    },
    shadow : [2, 2, 2],
    strokeStyle : "#17809a",
    lw : 2,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#f4ffcf", 95, "#b4af4f"]
    },
    shadow : [2, 2, 2],
    strokeStyle : "#a06909",
    lw : 2,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#fcd7cf", 95, "#bc574f"]
    },
    shadow : [2, 2, 2],
    strokeStyle : "#95100a",
    lw : 2,
    text : {
      fill : "#000"
    }
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#444", 95, "#000"]
    },
    strokeStyle : "#000",
    lw : 2,
    text : {
      fill : "#fff"
    },
    shadow : [2, 2, 2]
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#82cbfa", 95, "#024b8a"]
    },
    strokeStyle : "#2069a8",
    lw : 2,
    text : {
      fill : "#fff"
    },
    shadow : [2, 2, 2]
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#9cf89c", 95, "#1c881c"]
    },
    strokeStyle : "#2a9529",
    lw : 2,
    text : {
      fill : "#fff"
    },
    shadow : [2, 2, 2]
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#9bf0fe", 95, "#1b80ae"]
    },
    strokeStyle : "#17809a",
    lw : 2,
    text : {
      fill : "#fff"
    },
    shadow : [2, 2, 2]
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#f0ed8e", 95, "#b06d0e"]
    },
    strokeStyle : "#a06909",
    lw : 2,
    text : {
      fill : "#fff"
    },
    shadow : [2, 2, 2]
  }, {
    fillStyle : {
      gd : [0, 0, 0, 100],
      gdc : [5, "#f9938f", 95, "#99130f"]
    },
    strokeStyle : "#95100a",
    lw : 2,
    text : {
      fill : "#fff"
    },
    shadow : [2, 2, 2]
  }];
  /** @type {Array} */
  var descendants = [[4, 0, 3], [4, 4, 3], [0, 4, 3], [-4, 4, 3], [-4, 0, 3], [-4, -4, 3], [0, -4, 3], [4, -4, 3], [0, 0, 3]];
  /**
   * @param {Element} element
   * @param {Object} recurring
   * @return {undefined}
   */
  var callback = function(element, recurring) {
    var self = this;
    var $element = $(element);
    var elem = $("canvas", element);
    var style = elem[0];
    var target = $(style);
    var inputs = $(".ctx-menu", element);
    var childParts = $(".style-toolbar", element);
    /** @type {number} */
    style.width = $element.width() - 18;
    /** @type {number} */
    style.height = 1024;
    /** @type {Element} */
    self._el = element;
    /** @type {Object} */
    self._opt = recurring;
    self._textBox = $(".jh2d-text-box", element)[0];
    self._ctxMenu = inputs[0];
    self._styleToolbar = childParts.styleToolbar().on("selected", $.proxy(self._styleSelected, self))[0];
    var container = $(".sf-textures", element);
    self.jhe = jh2d.event.create({
      canvas : style,
      pcanvas : elem[1],
      pimage : container[0],
      jh2d : jh2d.canvas,
      types : jh2d.types()
    });
    self.jhe.on("end", $.proxy(self._end, self));
    container.one("load", function() {
      self.jhe.update();
    }).each(function() {
      if (this.complete) {
        $(this).load();
      }
    });
    $(element).on("click", "a[data-jh-cmd], button[data-jh-cmd]", $.proxy(self._cmd, self));
    target.on("mouseup", $.proxy(self._mouseup, self));
    target.on("contextmenu", $.proxy(self._contextmenu, self));
  };
  callback.prototype = {
    /** @type {function (Element, Object): undefined} */
    constructor : callback,
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    _cmd : function(ev) {
      var data = this;
      var scope = data.jhe;
      var self = $(ev.currentTarget).data();
			var node = $(ev.currentTarget);
			console.log($(ev.currentTarget))
      var $this = $(data._ctxMenu);
      var type = self.jhCmd;
      var i = self.param;
			var len = self.opt;
      switch(type) {
        case "shape":
					node = $.extend({}, self);
          var id = node.mode;
          delete node.jhCmd;
					delete node.mode;
          scope.mode({
            type : node,
            mode : id
          });
          break;
        case "text":
          scope.disabled(true);
          /** @type {string} */
          scope.c.style.cursor = "text";
          data.which = type;
          break;
        case "zoom":
          var x = scope.scale();
          if (len) {
            /** @type {number} */
            x = len > 0 ? Math.floor(10 * x) : Math.ceil(10 * x);
            x += 10 * i * len;
            x /= 10;
          } else {
            x = i;
          }
          scope.scale(x);
          /** @type {null} */
          var elmBody = null;
          elmBody = node.is("a") ? node.closest(".dropdown-menu").siblings(".dropdown-toggle") : node.siblings(".dropdown-toggle");
          elmBody.children("span").first().text(Math.ceil(100 * x) + "%");
          break;
        case "copystyle":
          var target = scope.selecteds();
          if (1 === target.length) {
            data._copyStyle = jh2d.util.extend({}, target[0], true, function(nodes) {
              return-1 === jh2d.util.inArray(["fillStyle", "strokeStyle", "shadow", "lw", "dashed"], nodes);
            });
            data.which = type;
          }
          break;
        case "quickstyle":
          var val = vals[i];
          scope.style(val);
          $(data._el).trigger("change");
          break;
        case "shadow":
          /** @type {null} */
          var descendant = null;
          if (-1 !== i) {
            descendant = descendants[i];
          }
          scope.style({
            shadow : descendant
          });
          $(data._el).trigger("change");
          break;
        case "alpha":
          scope.style({
            alpha : i
          });
          $(data._el).trigger("change");
          break;
        case "group":
          scope[i]();
          $this.hide();
          $(data._el).trigger("change");
          break;
        case "layer":
          scope[i]();
          $this.hide();
          $(data._el).trigger("change");
          break;
        case "align":
          scope.align(i);
          $this.hide();
          $(data._el).trigger("change");
          break;
        case "edit":
          data._editText();
          $this.hide();
      }
    },
    /**
     * @param {KeyboardEvent} event
     * @return {undefined}
     */
    _mouseup : function(event) {
      var v;
      var recurring;
      var self = this;
      var key = self.which;
      var e = event.originalEvent;
      var left = e.offsetX || e.layerX;
      var t = e.offsetY || e.layerY;
      var target = self.jhe;
      var node = target.c;
      var containerPos = $(node).offset();
      var $this = $(self._textBox);
      switch(left += node.offsetLeft, t += node.offsetTop, key) {
        case "text":
          if (self.lastWhich !== key) {
            $this.removeAttr("style");
            $this.css({
              position : "absolute",
              display : "block",
              overflow : "auto",
              resize : "both",
              border : "1px solid #ccc",
              left : left,
              top : t,
              zIndex : 200,
              minHeight : 24
            }).text("").focus();
          } else {
            v = $this.html();
            var buttonPos = $this.offset();
            if (self._resetTextBox(), "" !== v) {
              var zoom = target.scale();
              v = v.replace(/\n/g, "");
              recurring = {
                type : "rect",
                x : (buttonPos.left - containerPos.left) / zoom,
                y : (buttonPos.top - containerPos.top + 4) / zoom,
                w : $this.width(),
                h : $this.height(),
                style : 0,
                text : v
              };
              target.add(recurring);
              target.disabled(false);
              $(self._el).trigger("change");
            }
          }
          break;
        case "texting":
          var codeSegments = target.selecteds();
          if (codeSegments.length > 0) {
            v = $this.html();
            v = v.replace(/\n/g, "");
            recurring = {
              text : v
            };
            target.update(recurring);
            self._resetTextBox();
            target.disabled(false);
          }
          break;
        case "copystyle":
          target.update(self._copyStyle);
          $(self._el).trigger("change");
          /** @type {null} */
          self.which = null;
      }
      self.lastWhich = key;
    },
    /**
     * @return {undefined}
     */
    _editText : function() {
      var e = this;
      var key = e.which;
      var options = e.jhe;
      var div = $(e._textBox);
      var resultItems = options.selecteds();
      var $this = $(e._styleToolbar);
      if (1 === resultItems.length) {
        var result = resultItems[0];
        var resolution = options.scale();
        /** @type {number} */
        var offset = result.x * resolution;
        /** @type {number} */
        var pickWinTop = result.y * resolution;
        /** @type {number} */
        var minWidth = result.w * resolution;
        /** @type {number} */
        var minContentHeight = result.h * resolution;
        var item = result.text;
        div.css({
          position : "absolute",
          display : "block",
          overflow : "auto",
          resize : "both",
          border : "1px solid #ccc",
          backgroundColor : "#fff",
          left : offset,
          top : pickWinTop,
          minWidth : minWidth,
          minHeight : minContentHeight,
          zIndex : 200
        }).html("object" == typeof item ? item.text : item);
        e._placeCaretAtEnd(div[0]);
        options.update({
          text : ""
        });
        /** @type {string} */
        e.which = "texting";
        options.disabled(true);
        $this.hide();
      }
      e.lastWhich = key;
    },
    /**
     * @param {?} text
     * @return {undefined}
     */
    _placeCaretAtEnd : function(text) {
      if ("undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
        /** @type {(Range|null)} */
        var range = document.createRange();
        range.selectNodeContents(text);
        range.collapse(false);
        /** @type {(Selection|null)} */
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        if ("undefined" != typeof document.body.createTextRange) {
          /** @type {(TextRange|null)} */
          var rng = document.body.createTextRange();
          rng.moveToElementText(text);
          rng.collapse(false);
          rng.select();
        }
      }
    },
    /**
     * @return {undefined}
     */
    _resetTextBox : function() {
      var e = this;
      var target = e.jhe;
      var node = target.c;
      var $this = $(e._textBox);
      delete e.which;
      delete e.lastWhich;
      /** @type {string} */
      node.style.cursor = "default";
      $this.hide();
    },
    /**
     * @param {number} e
     * @return {undefined}
     */
    _end : function(e) {
      var self = this;
      var o = self.jhe;
      var codeSegments = o.selecteds();
      var $summary = $(self._ctxMenu);
      var $this = $(self._styleToolbar);
      if (codeSegments.length > 0) {
        var vp = codeSegments[0];
        var c = o.c;
        var width = c.width;
        var ox = vp.x;
        var testY = vp.y;
        var unit = vp.w;
        var viewHeight = vp.h;
        var args = jh2d.util.maxRect([ox, testY], [ox + unit, testY + viewHeight]);
        var textWidth = $this.width();
        var x = args[2] + 10;
        var pageY = args[1];
        if (args[0] > width - textWidth - 10) {
          /** @type {number} */
          x = args[0] - textWidth;
        }
        $this.css({
          display : "block",
          left : x,
          top : pageY
        });
      } else {
        $this.hide();
        $summary.hide();
      }
      if (e > 0) {
        $(self._el).trigger("change", [e]);
      }
    },
    /**
     * @param {KeyboardEvent} collection
     * @return {?}
     */
    _contextmenu : function(collection) {
      var context = this;
      var e = collection.originalEvent;
      var pickWinLeft = e.offsetX || e.layerX;
      var pickWinTop = e.offsetY || e.layerY;
      var j = context.jhe;
      var $this = $(context._ctxMenu);
      var codeSegments = j.selecteds();
      return codeSegments.length > 0 ? ($(".dropdown", $this).addClass("disabled"), $(".dropup", $this).addClass("disabled"), $this.css({
        display : "block",
        left : pickWinLeft,
        top : pickWinTop
      }), codeSegments.length > 1 && ($(".dropdown", $this).removeClass("disabled"), $(".dropup", $this).removeClass("disabled"))) : $this.hide(), false;
    },
    /**
     * @param {?} dataAndEvents
     * @param {Object} recurring
     * @return {undefined}
     */
    _styleSelected : function(dataAndEvents, recurring) {
      var elem = this;
      var options = elem.jhe;
      var codeSegments = options.selecteds();
      var context = recurring.fillStyle;
      if ("object" == typeof context && void 0 !== context.gd) {
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          var col;
          var particle = codeSegments[i];
          var x = context.gdSplit || 2;
          /** @type {Array} */
          var out = [];
          /** @type {number} */
          var l = context.gdReversed ? -1 : 1;
          if ("string" == typeof particle.fillStyle) {
            /** @type {string} */
            col = particle.fillStyle;
          } else {
            if ("object" == typeof particle.fillStyle) {
              col = particle.fillStyle.color;
              if (!col) {
                if (jh2d.util.isArray(particle.fillStyle.gdc)) {
                  col = particle.fillStyle.gdc[1];
                }
              }
            }
          }
          /** @type {string} */
          col = col || "#ddd";
          /** @type {number} */
          var len = 100 / (x - 1);
          /** @type {number} */
          var y = 0;
          for (;x > y;y++) {
            /** @type {number} */
            out[out.length] = y * len;
            out[out.length] = jh2d.util.darkColor(col, y % 2 === 0 ? -64 * l : 64 * l);
          }
          /** @type {Array} */
          context.gdc = out;
          /** @type {string} */
          context.color = col;
        }
      }
      options.update(recurring);
    },
    /**
     * @param {string} key
     * @return {?}
     */
    data : function(key) {
      var elem = this;
      var options = elem.jhe;
      if ("undefined" == typeof key) {
        return options.data();
      }
      options.data(key);
      options.update();
      var scaleX = options.scale();
      $("#zoomBtn").children("span").first().text(Math.ceil(100 * scaleX) + "%");
    },
    /**
     * @param {string} type
     * @return {?}
     */
    toDataURL : function(type) {
      var self = this;
      var el = self._el;
      var elements = $("canvas", el);
      var canvas = elements[0];
      /** @type {number} */
      var old = 5;
      /** @type {number} */
      var minX = 5;
      var dataX = jh2d.util.biggestRect(self.data().d);
      /** @type {number} */
      var w = dataX[2] - dataX[0] + 2 * minX;
      /** @type {number} */
      var canvasHeight = dataX[3] - dataX[1] + 2 * old;
      var resultItems = self.data().d;
      /** @type {Array} */
      var value = [];
      if ("jpg" === type) {
        value[0] = {
          type : "rect",
          style : 1,
          x : 0,
          y : 0,
          w : w,
          h : canvasHeight
        };
      }
      /** @type {number} */
      var i = 0;
      for (;i < resultItems.length;i++) {
        var result = resultItems[i];
        /** @type {number} */
        var id = value.length;
        value[id] = jh2d.util.extend({}, result, false, ["d"]);
        value[id].x -= dataX[0] - minX;
        value[id].y -= dataX[1] - old;
      }
      if (elements.length > 2) {
        canvas = elements[2];
        /** @type {number} */
        canvas.width = w;
        /** @type {number} */
        canvas.height = canvasHeight;
        var two = jh2d.canvas.create({
          canvas : canvas,
          pcanvas : elements[1],
          pimage : $(".sf-textures", el)[0],
          types : jh2d.types()
        });
        two.clear();
        two.renderer(value);
      }
      if ("jpg" === type) {
        return canvas.toDataURL("image/jpeg", 0.7);
      }
      if ("svg" === type) {
        var encodedValue = jh2d.svg.create().parse({
          d : value,
          w : w,
          h : canvasHeight
        }, jh2d.types());
        /** @type {string} */
        var dataUrl = "data:image/svg;charset=utf-8," + encodeURIComponent(encodedValue);
        return dataUrl;
      }
      return canvas.toDataURL();
    },
    /**
     * @return {undefined}
     */
    remove : function() {
      var number = this;
      var n = number.jhe;
      n.remove();
    }
  };
  /**
   * @param {number} arg
   * @return {?}
   */
  $.fn.jh2dEditor = function(arg) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var $target = $(this);
      var instance = $target.data("jh2dEditor");
      var data = "object" == typeof arg ? arg : {};
      if (instance || "string" == typeof arg) {
        if ("string" == typeof arg) {
          instance[arg].apply(instance, Array.prototype.slice.call(args, 1));
        }
      } else {
        $target.data("jh2dEditor", new callback(this, data));
      }
    });
  };
  (function() {
    $('div[contenteditable="true"]').keypress(function(event) {
      if (13 !== event.which) {
        return true;
      }
      /** @type {DocumentFragment} */
      var fragment = document.createDocumentFragment();
      /** @type {Text} */
      var elem = document.createTextNode("\n");
      fragment.appendChild(elem);
      /** @type {Element} */
      elem = document.createElement("br");
      fragment.appendChild(elem);
      /** @type {(Range|null)} */
      var range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      range.insertNode(fragment);
      /** @type {(Range|null)} */
      range = document.createRange();
      range.setStartAfter(elem);
      range.collapse(true);
      /** @type {(Selection|null)} */
      var selection = window.getSelection();
      return selection.removeAllRanges(), selection.addRange(range), false;
    });
    $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function(event) {
      var $customSelect = $(this).parent();
      event.preventDefault();
      event.stopPropagation();
      if (!$customSelect.is(".disabled")) {
        if ($customSelect.is(".open")) {
          $customSelect.removeClass("open");
        } else {
          $customSelect.addClass("open");
        }
      }
    });
  })();
});

!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(window.jQuery);
    }
  }
}(this, function($) {
  /**
   * @param {Element} el
   * @param {?} recurring
   * @return {undefined}
   */
  var Plugin = function(el, recurring) {
    var self = this;
    /** @type {Element} */
    self._el = el;
    self._opt = recurring;
    $(".colorpickerplus-dropdown .colorpickerplus-container", el).colorpickerembed().on("changeColor", $.proxy(self._changeColor, self));
    $("input[name=fillImage]", el).on("blur", $.proxy(self._selectImage, self));
    $(el).on("click", "a", $.proxy(self._select, self));
  };
  Plugin.prototype = {
    /** @type {function (Element, ?): undefined} */
    constructor : Plugin,
    /**
     * @param {Event} event
     * @return {undefined}
     */
    _select : function(event) {
      var self = this;
      var $spy = $(event.currentTarget);
      var options = $spy.data();
      if (void 0 !== options.gd) {
        self._selectGradient(event);
      } else {
        if (options.pattern) {
          self._selectPattern(event);
        } else {
          if (!$.isEmptyObject(options)) {
            var data = {};
            var name;
            for (name in options) {
              var value = options[name];
              /** @type {RegExp} */
              var IDENTIFIER = /(\w+)([A-Z]\w*)/;
              /** @type {(Array.<string>|null)} */
              var parts = IDENTIFIER.exec(name);
              if (parts) {
                var element = {};
                element[parts[2].toLowerCase()] = value;
                data[parts[1]] = element;
              } else {
                data[name] = value;
              }
            }
            $(self._el).trigger("selected", data);
          }
        }
      }
    },
    /**
     * @param {Event} ev
     * @param {string} i
     * @return {undefined}
     */
    _changeColor : function(ev, i) {
      var self = this;
      var elem = $(ev.target);
      var value = elem.data("name");
      if (void 0 === i) {
        /** @type {string} */
        i = "transparent";
      }
      var result = {};
      /** @type {RegExp} */
      var rchecked = /(\w+)\-(\w+)/i;
      /** @type {(Array.<string>|null)} */
      var items = rchecked.exec(value);
      if (items) {
        var obj = {};
        /** @type {string} */
        obj[items[2]] = i;
        result[items[1]] = obj;
      } else {
        /** @type {string} */
        result[value] = i;
      }
      $(self._el).trigger("selected", result);
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    _selectPattern : function(event) {
      var self = this;
      var id = $(event.currentTarget).data("pattern");
      if (id) {
        $(self._el).trigger("selected", {
          fillStyle : {
            p : id
          }
        });
      }
    },
    /**
     * @param {Event} event
     * @return {undefined}
     */
    _selectGradient : function(event) {
      var self = this;
      var $spy = $(event.currentTarget);
      $(self._el).trigger("selected", {
        fillStyle : $spy.data()
      });
    },
    /**
     * @param {Event} ev
     * @return {undefined}
     */
    _selectImage : function(ev) {
      var self = this;
      var requestUrl = $(ev.target).val();
      if (/^((http|https):)?\/\//.test(requestUrl)) {
        $(self._el).trigger("selected", ["fillStyle", {
          url : requestUrl
        }]);
      }
    }
  };
  /**
   * @param {number} arg
   * @return {?}
   */
  $.fn.styleToolbar = function(arg) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var $el = $(this);
      var instance = $el.data("styleToolbar");
      var options = "object" == typeof arg ? arg : {};
      if (instance || "string" == typeof arg) {
        if ("string" == typeof arg) {
          instance[arg].apply(instance, Array.prototype.slice.call(args, 1));
        }
      } else {
        $el.data("styleToolbar", new Plugin(this, options));
      }
    });
  };
});

// Ejecucion del canvas
!function(dataAndEvents, factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("undefined" != typeof module && module.exports) {
      module.exports = factory(require("jquery"));
    } else {
      factory(window.jQuery);
    }
  }
}(this, function($) {
  /**
   * @param {Element} element
   * @param {?} props
   * @return {undefined}
   */
  var Plugin = function(element, props) {
    var self = this;
    /** @type {Element} */
    self._el = element;
    self._opt = props;
    self._adapter = $(".jh2d-editor", element).ntadapter({
      data : $.proxy(self._data, self)
    }).jh2dEditor(props).on("change", $.proxy(self._change, self));
    $(element).notes({
      id : "_jh2d",
      adapter : self._adapter,
      suffix : "sfd",
      mime : "text/json",
      msgbox : props.msgbox,
      /**
       * @param {Object} data
       * @return {?}
       */
      saveData : function(data) {
        var items = data.d;
        var resultItems = data.g;
        /** @type {Array} */
        var value = [];
        /** @type {Array} */
        var deps = [];
        /** @type {number} */
        var i = 0;
        /** @type {null} */
        var val = null;
        /** @type {number} */
        i = 0;
        for (;i < items.length;i++) {
          var doc = items[i];
          value[value.length] = jh2d.util.extend({}, doc, false, ["d"]);
        }
        /** @type {number} */
        i = 0;
        for (;i < resultItems.length;i++) {
          var result = resultItems[i];
          deps[deps.length] = jh2d.util.extend({}, result, false, ["d"]);
        }
        return val = jh2d.util.extend({
          d : value,
          g : deps
        }, data);
      }
    }).on("cmd.nts", $.proxy(self._cmd, self));
    Mousetrap.bind(["command+p", "ctrl+p"], $.proxy(self.print, self));
    Mousetrap.bind(["del"], $.proxy(self._delete, self));
  };
  Plugin.prototype = {
    /** @type {function (Element, ?): undefined} */
    constructor : Plugin,
    /**
     * @return {undefined}
     */
    _change : function() {
      var self = this;
      var $target = $(self._adapter);
      var browserEvent = $target.data("jh2dEditor");
      $target.trigger("edit.ntadapter", browserEvent.data());
    },
    /**
     * @param {?} data
     * @return {?}
     */
    _data : function(data) {
      var self = this;
      var browserEvent = $(self._adapter).data("jh2dEditor");
      return "undefined" == typeof data ? browserEvent.data() : void browserEvent.data("undefined" == typeof data.d ? {} : data.d);
    },
    /**
     * @param {?} dataAndEvents
     * @param {?} elem
     * @return {undefined}
     */
		// INIT EXPORT
    _cmd : function(dataAndEvents, elem) {
      var self = this;
      var section = $(self._el);
	    var items = section.data("notes");
      var $elem = $(elem);
      var req = $elem.data();
      var type = req.ntsCmd;
      var param = req.param;
			var $spy = $(self._adapter);
			//clona lo que esta en pantalla
      var clone = $spy.data("jh2dEditor");
      switch(type) {
        case "print":
          self.print();
          break;
				case "export":
					/*Lo mostrado en pantalla se pasa a base 64 a traves de la funcion toDataURL
					que recibe como parametro la extension que puede ser JPG, PNG.
					*/
					var result = clone.toDataURL(param);

					//Obtiene el archivo actual que es el que tenemos abierto y mostrado en pantalla
					var symbol = items.activeFile();
					/*Guarda el archivo, el saveAs tiene como parametro el archivo pasado a base64 que seria la imagen
					transformada a puro texto, el nombre de la imagen seguido de la extension utilizando expresiones regulares
					que es lo que esta en el replace y finalmente indicamos que sera una imagen */
          items.saveAs(result, symbol.name.replace(/([^\.]+)(\.\w+)?/i, "$1." + param), "image/*");
      }
    },
    /**
     * @return {?}
     */
    _delete : function() {
      var self = this;
      var $spy = $(self._adapter);
      var selfObj = $spy.data("jh2dEditor");
      return selfObj.remove(), false;
    },
    /**
     * @return {?}
     */
    print : function() {
      return window.print(), false;
    },
    /**
     * @return {undefined}
     */
    resize : function() {
      var self = this;
      var set = $(self._el);
      var sideHeight = set.height();
      var anim = $(".jh2d-editor", set);
      var all = $(".jh2d-canvas", set);
      anim.height(sideHeight - 72);
      all.height(sideHeight - 72 - 32);
    }
  };
  /**
   * @param {string} arg
   * @return {?}
   */
  $.fn.shapeflyDiagram = function(arg) {
    /** @type {Arguments} */
    var args = arguments;
    return this.each(function() {
      var $el = $(this);
      var instance = $el.data("shapeflyDiagram");
      var options = "object" == typeof arg ? arg : {};
      if (instance || "string" == typeof arg) {
        if ("string" == typeof arg) {
          instance[arg].apply(instance, Array.prototype.slice.call(args, 1));
        }
      } else {
        $el.data("shapeflyDiagram", new Plugin(this, options));
      }
    });
  };
}), $(document).ready(function() {
  var that = $(".notes").shapeflyDiagram({
    msgbox : $("#myMsgBox").msgbox()[0]
  });
  var canvas = $(window).on("resize", function() {
    that.shapeflyDiagram("resize");
  });
  if (!("undefined" != typeof chrome && chrome.storage)) {
    canvas.bind("beforeunload", function() {
      return window.localStorage ? void that.notes("save2LocalStore") : "Do you really want to close?";
    });
  }
  that.shapeflyDiagram("resize");
});
