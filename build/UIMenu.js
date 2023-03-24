class UI { 
  constructor() {} 
  
  static Menu = document.querySelector('.menu');
  
  static Group = class {
    constructor(name) {
      this.element = document.createElement('details');
      this.element.classList.add('group');
      UI.Menu.appendChild(this.element);
  
      const summary = document.createElement('summary');
      summary.innerHTML = name;
      this.element.appendChild(summary);
    }
    add(component) {
      UI.Menu.removeChild(component.element);
      this.element.appendChild(component.element);
    }
    set isOpen(state) {
      this.element.open = state;
    }
  }
  
  static Button = class {
    constructor(name, buttonName) {
      this.element = document.createElement('details');
      UI.Menu.appendChild(this.element);
  
      const summary = document.createElement('summary');
      summary.innerHTML = name;
      this.element.appendChild(summary);
  
      this.input = document.createElement('button');
      this.input.innerHTML = buttonName;
      this.element.appendChild(this.input);
  
      this.toggleable = false;
      this.state = true;
      this.states = ['Enable', 'Disable']
  
      let scope = this;
      this.input.onclick = function() {
        scope.onclick();
        scope.toggle();
      };
    }
    onclick() { };
    toggle() {
      if (!this.toggleable) return;
      this.state = !this.state;
      this.input.innerHTML = (this.state) ? this.states[0] : this.states[1];
    }
  }

  static Number = class {
    constructor(name, initialValue) {
      this.element = document.createElement('details');
      UI.Menu.appendChild(this.element);
      
      const summary = document.createElement('summary');
      summary.innerHTML = name;
      this.element.appendChild(summary);
  
      this.input = document.createElement('input');
      this.input.setAttribute('type', 'number');
      this.input.setAttribute('value', initialValue);
      this.element.appendChild(this.input);
  
      let scope = this;
      this.input.oninput = function() {
        if(!scope.value) return;
        scope.onchange(scope.value);
      };
    }
    get value() {
      return parseInt(this.input.value);
    }
    set isOpen(state) {
      this.element.open = state;
    }
  }

  static Slider = class {
    constructor(name, range) {
      this.element = document.createElement('details');
      UI.Menu.appendChild(this.element);
  
      const summary = document.createElement('summary');
      summary.innerHTML = name;
      this.element.appendChild(summary);
  
      this.input = document.createElement('input');
      this.input.setAttribute('type', 'range');
      this.input.setAttribute('min', range[0]);
      this.input.setAttribute('max', range[2]);
      this.input.setAttribute('value', range[1]);
      this.input.setAttribute('step', range[3] || 1);
      this.element.appendChild(this.input);
  
      this.print = document.createElement('p');
      this.print.innerHTML = range[1];
      this.element.appendChild(this.print);
  
      let scope = this;
      this.input.oninput = function() {
        scope.print.innerHTML = scope.value;
        scope.onchange(scope.value);
      };
    }
    get value() {
      return parseFloat(this.input.value);
    }
    set isOpen(state) {
      this.element.open = state;
    }
    onchange() {};
  }

  static Value = class {
    constructor(name) {
      this.element = document.createElement('details');
      UI.Menu.appendChild(this.element);
  
      const summary = document.createElement('summary');
      summary.innerHTML = name;
      this.element.appendChild(summary);
  
      this.print = document.createElement('p');
      this.element.appendChild(this.print);
    }
    set value(variable) {
      this.print.innerHTML = variable;
    }
  }
};
