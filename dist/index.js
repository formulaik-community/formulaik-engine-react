function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var formik = require('formik');
var nanoid = require('nanoid');

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var componentResolver = (function (props) {
  var _props$componentsLibr = props.componentsLibraries,
      componentsLibraries = _props$componentsLibr === void 0 ? [function () {
    return null;
  }] : _props$componentsLibr,
      item = props.item,
      cache = props.cache;

  if (cache) {
    var _cached = cache.getComponent({
      key: item.type
    });

    if (_cached) {
      return _cached;
    }
  }

  for (var i = 0; i < componentsLibraries.length; i++) {
    var library = componentsLibraries[i];

    if (!library) {
      continue;
    }

    if (typeof library !== 'function') {
      console.log('is not function', library);
      continue;
    }

    var component = library(item);

    if (component) {
      if (cache) {
        cache.addComponent({
          component: component,
          key: item.type
        });
      }

      return component;
    }
  }

  return null;
});

var Add = (function (_ref) {
  var onClick = _ref.onClick,
      title = _ref.title,
      disabled = _ref.disabled;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "flex justify-center my-10"
  }, /*#__PURE__*/React__default.createElement("button", {
    disabled: disabled,
    type: "button",
    onClick: onClick
  }, title ? title : "Add"));
});

var render = (function (props) {
  var initialValues = props.initialValues,
      _props$item = props.item,
      id = _props$item.id,
      _props$item$className = _props$item.className,
      className = _props$item$className === void 0 ? "" : _props$item$className,
      params = _props$item.params,
      container = _props$item.container,
      add = _props$item.add,
      preferInitialValues = _props$item.preferInitialValues,
      _props$item$isDependa = _props$item.isDependant,
      isDependant = _props$item$isDependa === void 0 ? false : _props$item$isDependa,
      hideErrors = props.hideErrors;

  var _items = preferInitialValues ? initialValues[id] : props.valuesRef.current[id] ? props.valuesRef.current[id] : null;

  if (!_items) {
    _items = [];
  }

  var _useState = React.useState(_items),
      items = _useState[0],
      setItems = _useState[1];

  var Component = componentResolver(_extends({}, props, {
    componentsLibraries: props.componentsLibraries,
    item: params
  }));

  if (!Component) {
    return null;
  }

  var ContainerComponent = componentResolver(_extends({}, props, {
    componentsLibraries: props.componentsLibraries,
    item: container
  }));

  if (!ContainerComponent) {
    ContainerComponent = function ContainerComponent(_ref) {
      var children = _ref.children;
      return /*#__PURE__*/React__default.createElement("div", null, children);
    };
  }

  var AddComponent = componentResolver(_extends({}, props, {
    componentsLibraries: props.componentsLibraries,
    item: add
  }));

  if (!AddComponent) {
    AddComponent = Add;
  }

  var arrayHelpers = props.arrayHelpers;
  var swap = arrayHelpers.swap,
      push = arrayHelpers.push,
      remove = arrayHelpers.remove;

  var onAdd = function onAdd() {
    var newItem = params.params.placeholder ? params.params.placeholder() : null;

    var _i = [].concat(items, [newItem]);

    onValueChanged(_i);
    push(newItem);
  };

  var onValueChanged = function onValueChanged(value) {
    var id = props.item.id;

    var _values = _extends({}, props.valuesRef.current);

    _values[id] = value;
    props._onValueChanged && props._onValueChanged({
      id: id,
      value: value
    });
    setItems(value);
  };

  var Renderer = isDependant ? formik.Field : formik.FastField;
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "w-full overflow-x-scroll " + (props.item.isHorizontal ? 'flex gap-2 pb-8' : '')
  }, items && items.length > 0 && items.map(function (entry, index) {
    var itemId = id + "." + index;
    return /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: "form-control " + (!props.item.isHorizontal ? 'mb-4' : '') + "  " + className
    }, /*#__PURE__*/React__default.createElement(Renderer, {
      type: params.type,
      name: itemId
    }, function (_ref2) {

      var onRemoveRequired = function onRemoveRequired() {
        remove(index);

        var _i = [].concat(props.valuesRef.current[id]);

        _i.splice(index, 1);

        onValueChanged(_i);
      };

      var onMoveDownRequired = function onMoveDownRequired() {
        if (items.length <= index) {
          return;
        }

        swap(index, index + 1);

        var _i = [].concat(props.valuesRef.current[id]);

        var object = _i[index];
        var other = _i[index + 1];
        _i[index] = other;
        _i[index + 1] = object;
        onValueChanged(_i);
      };

      var onMoveUpRequired = function onMoveUpRequired() {
        if (index === 0) {
          return;
        }

        swap(index, index - 1);

        var _i = [].concat(props.valuesRef.current[id]);

        var object = _i[index];
        var other = _i[index - 1];
        _i[index] = other;
        _i[index - 1] = object;
        onValueChanged(_i);
      };

      var onEntryValuesChanged = function onEntryValuesChanged(value) {
        var _i = [].concat(props.valuesRef.current[id]);

        _i[index] = value;
        onValueChanged(_i);
      };

      var disabled = props.isSubmitting || props.disabled || props.item && props.item.disabled;
      var readOnly = props.readOnly || props.props && props.props.readOnly;

      var adaptedProps = _extends({}, props);

      adaptedProps.item = _extends({}, adaptedProps.item, {
        params: adaptedProps.item.params.params
      });
      return /*#__PURE__*/React__default.createElement(ContainerComponent, _extends({}, container, {
        arrayHelpers: arrayHelpers,
        onMoveDownRequired: onMoveDownRequired,
        onMoveUpRequired: onMoveUpRequired,
        onRemoveRequired: onRemoveRequired,
        canMoveUp: props.item.canMove && index > 0,
        canMoveDown: props.item.canMove && index < items.length - 1,
        canRemove: props.item.canRemove,
        showControls: props.item.showControls,
        index: index,
        value: entry
      }), /*#__PURE__*/React__default.createElement(Component, _extends({}, adaptedProps, {
        disabled: disabled,
        readOnly: readOnly,
        value: entry,
        onValueChanged: onEntryValuesChanged
      })));
    }), !hideErrors ? /*#__PURE__*/React__default.createElement(formik.ErrorMessage, {
      name: itemId,
      component: "div",
      className: "text-sm text-red-600 pt-2"
    }) : null);
  })), !props.disabled && props.item.canAddItems && !items.length < props.item.maxItems && /*#__PURE__*/React__default.createElement(AddComponent, {
    onClick: onAdd,
    title: add.title,
    disabled: items.length >= props.item.maxItems
  }));
});

var ErrorMessage = (function (_ref) {
  var name = _ref.name;
  return /*#__PURE__*/React__default.createElement(formik.Field, {
    name: name,
    render: function render(_ref2) {
      var form = _ref2.form;
      var error = formik.getIn(form.errors, name);
      var touch = formik.getIn(form.touched, name);
      return touch && error ? error : null;
    }
  });
});

var LabelRenderer = (function (props) {
  var _props$item = props.item,
      label = _props$item.label,
      hideLabel = _props$item.hideLabel;

  if (hideLabel || !label) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React__default.createElement("h5", null, label));
});

var ArrayField = (function (props) {
  var _props$item = props.item,
      type = _props$item.type,
      id = _props$item.id,
      _props$item$className = _props$item.className,
      className = _props$item$className === void 0 ? "" : _props$item$className,
      hideErrors = props.hideErrors;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "" + className
  }, /*#__PURE__*/React__default.createElement(LabelRenderer, props), /*#__PURE__*/React__default.createElement(formik.FieldArray, {
    type: type,
    name: id,
    component: function component(arrayHelpers) {
      return render(_extends({}, props, {
        arrayHelpers: arrayHelpers
      }));
    }
  }), !hideErrors ? /*#__PURE__*/React__default.createElement(ErrorMessage, {
    name: id,
    component: "div",
    className: "text-sm text-pink-600 pt-2"
  }) : null);
});

var SingleField = (function (props) {
  var _props$item = props.item,
      type = _props$item.type,
      id = _props$item.id,
      _props$item$isDependa = _props$item.isDependant,
      isDependant = _props$item$isDependa === void 0 ? false : _props$item$isDependa,
      _props$item$className = _props$item.className,
      className = _props$item$className === void 0 ? "" : _props$item$className,
      hideErrors = props.hideErrors;
  var Component = componentResolver(_extends({}, props, {
    componentsLibraries: props.componentsLibraries,
    item: props.item
  }));

  if (!Component) {
    return null;
  }

  var _id = id ? id : nanoid.nanoid();

  var Renderer = isDependant ? formik.Field : formik.FastField;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "mb-6 " + className
  }, /*#__PURE__*/React__default.createElement(LabelRenderer, props), /*#__PURE__*/React__default.createElement(Renderer, {
    type: type,
    name: _id
  }, function (_ref) {
    var field = _ref.field,
        form = _ref.form;

    var onValueChanged = function onValueChanged(value) {
      if (!props.item.id) {
        return;
      }

      var id = props.item.id,
          setFieldValue = props.setFieldValue,
          setFieldTouched = props.setFieldTouched;
      props._onValueChanged && props._onValueChanged({
        id: id,
        value: value
      });
      setFieldValue(id, value, true);
      setFieldTouched(id, true, false);
    };

    var disabled = props.isSubmitting || props.disabled || props.item && props.item.disabled;
    var readOnly = props.readOnly || props.props && props.props.readOnly;
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Component, _extends({}, props, {
      disabled: disabled,
      readOnly: readOnly,
      value: props.values[id],
      error: props.errors[id],
      field: field,
      form: form,
      onValueChanged: onValueChanged
    })), !hideErrors && id ? /*#__PURE__*/React__default.createElement("div", {
      className: " my-2 mb-4 px-2 rounded-b-lg"
    }, /*#__PURE__*/React__default.createElement(formik.ErrorMessage, {
      name: _id,
      component: "div",
      className: "text-sm text-pink-600"
    })) : null);
  }));
});

var generate = (function (props) {
  var inputs = props.inputs;
  var items = Array.isArray(inputs) ? inputs : inputs();
  return /*#__PURE__*/React__default.createElement(formik.Form, null, items.map(function (item) {
    var isMulti = item.isMulti;

    if (isMulti) {
      return renderMultiItems(_extends({}, props, {
        item: item
      }));
    }

    return renderItem(_extends({}, props, {
      item: item
    }));
  }));
});

var renderMultiItems = function renderMultiItems(props) {
  var _props$item = props.item,
      className = _props$item.className,
      items = _props$item.items;
  return /*#__PURE__*/React__default.createElement("div", {
    className: className
  }, items.map(function (_item) {
    return renderItem(_extends({}, props, {
      item: _item
    }));
  }));
};

var renderItem = function renderItem(props) {
  var item = props.item;

  if (item.hide) {
    return null;
  }

  if (item.isList) {
    return /*#__PURE__*/React__default.createElement(ArrayField, props);
  }

  return /*#__PURE__*/React__default.createElement(SingleField, props);
};

var FormulaikCache = /*#__PURE__*/function () {
  function FormulaikCache(props) {
    var _this = this;

    this._data = {};
    this._cdata = {};

    this.add = function (_ref) {
      var search = _ref.search,
          results = _ref.results,
          key = _ref.key;

      var _key = key.toLowerCase();

      if (!_this.data[_key]) {
        _this.data[_key] = {};
      }

      _this.data[_key][search] = [].concat(results);
    };

    this.get = function (_ref2) {
      var search = _ref2.search,
          key = _ref2.key;

      var _key = key.toLowerCase();

      if (!_this.data[_key]) {
        return null;
      }

      return _this.data[_key][search];
    };

    this.clear = function () {
      _this.data = {};
    };

    this.addComponent = function (_ref3) {
      var component = _ref3.component,
          key = _ref3.key;

      var _key = key.toLowerCase();

      _this.cdata[_key] = component;
    };

    this.getComponent = function (_ref4) {
      var key = _ref4.key;

      var _key = key.toLowerCase();

      if (!_this.cdata[_key]) {
        return null;
      }

      return _this.cdata[_key];
    };
  }

  _createClass(FormulaikCache, [{
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      this._data = value;
    }
  }, {
    key: "cdata",
    get: function get() {
      return this._cdata;
    },
    set: function set(value) {
      this._cdata = value;
    }
  }]);

  return FormulaikCache;
}();

var index = (function (props) {
  var error = props.error,
      onFormPropsChanged = props.onFormPropsChanged,
      _props$disableCache = props.disableCache,
      disableCache = _props$disableCache === void 0 ? false : _props$disableCache,
      _props$hideErrors = props.hideErrors,
      hideErrors = _props$hideErrors === void 0 ? false : _props$hideErrors,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly;
  var initialValues = typeof props.initialValues !== 'function' ? props.initialValues : props.initialValues && props.initialValues();
  var validationSchema = typeof props.validationSchema !== 'function' ? props.validationSchema : props.validationSchema && props.validationSchema();

  var _form = React.useRef();

  var valuesRef = React.useRef(initialValues ? initialValues : {});
  var cache = disableCache ? null : props.cache ? props.cache : React.useRef(new FormulaikCache()).current;

  var onValuesChanged = function onValuesChanged(values) {
    valuesRef.current = values;
    props.onValuesChanged && props.onValuesChanged(values);
  };

  var onSubmit = function onSubmit(values, actions) {
    try {
      var setValues = actions.setValues;
      setValues(valuesRef.current);
      return Promise.resolve(props.onSubmit(valuesRef.current, actions));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var _onValueChanged = function _onValueChanged(_ref) {
    var id = _ref.id,
        value = _ref.value;

    var values = _extends({}, valuesRef.current);

    values[id] = value;
    onValuesChanged(values);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: ""
  }, /*#__PURE__*/React__default.createElement(formik.Formik, {
    ref: _form,
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: onSubmit
  }, function (formProps) {
    onFormPropsChanged && onFormPropsChanged(formProps);
    return generate(_extends({}, formProps, props, {
      initialValues: initialValues,
      validationSchema: validationSchema,
      onValuesChanged: onValuesChanged,
      _onValueChanged: _onValueChanged,
      values: valuesRef.current,
      valuesRef: valuesRef,
      cache: cache,
      disableCache: disableCache,
      disabled: disabled,
      readOnly: readOnly,
      hideErrors: hideErrors
    }));
  }), error && /*#__PURE__*/React__default.createElement("div", {
    className: "mt-6 text-pink-600 text-center"
  }, /*#__PURE__*/React__default.createElement("label", null, error.message)));
});

module.exports = index;
//# sourceMappingURL=index.js.map
