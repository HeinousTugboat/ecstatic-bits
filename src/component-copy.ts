class Component {
  public actor: Actor | undefined;
}

interface ComponentType<T extends Component> { new(...args: any[]): T; }



class Actor {
  public components: Component[] = [];

  private getComponentIndex<T extends Component>(type: ComponentType<T>): number {
      for (let i = 0; i < this.components.length; ++i) {
          const component: Component = this.components[i];
          if (component instanceof type) {
              return i;
          }
      }
      return -1;
  }

  public hasComponent<T extends Component>(type: ComponentType<T>): boolean {
      return this.getComponentIndex(type) !== -1;
  }

  public getComponent<T extends Component>(type: ComponentType<T>, ...args: any[]): T {
      const index: number = this.getComponentIndex(type);
      if (index !== -1) {
          return this.components[index] as T;
      }
      return this.addComponent(type, ...args);
  }

  public addComponent<T extends Component>(type: ComponentType<T>, ...args: any[]): T {
      if (this.hasComponent(type)) { return this.getComponent(type); }
      const component: T = new type(...args); // this needs ES5
      component.actor = this;
      this.components.push(component);
      return component;
  }

  public delComponent<T extends Component>(type: ComponentType<T>): T {
      const component: Component = this.getComponent(type);
      this.components.splice(this.components.indexOf(component), 1);
      component.actor = undefined;
      return component as T;
  }
}

class AwesomeComponent extends Component {
  public message: string;
  constructor(message: string) {
      super();
      this.message = message;
  }
  public alert(): void {
      console.log(this.message);
  }
}

function testComponent(): void {
  const actor = new Actor();
  if (actor.hasComponent(AwesomeComponent)) { throw new Error(); }
  actor.addComponent(AwesomeComponent, 'awesome!');
  const awesome = actor.getComponent(AwesomeComponent); // automatic cast!
  awesome.alert();
  actor.delComponent(AwesomeComponent);
  if (actor.hasComponent(AwesomeComponent)) { throw new Error(); }
}

testComponent();
