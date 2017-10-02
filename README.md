# ecstatic-bits
Everyone needs their own ECS right?

[Homepage](https://heinoustugboat.github.io/ecstatic-bits/)

[SystemJS Bundle](https://heinoustugboat.github.io/ecstatic-bits/lib/bundle.js)

[Node Library](https://heinoustugboat.github.io/ecstatic-bits/lib/ecstatic-bits.js)

## API

| Class |  Description
| ----- |  -----------
| `EcstaticBits` | Base class, contains all other classes.
| `Entity` | Core Entity class, components attach here.
| `ComponentType` | Component Type, instantiates into Components
| `Component` | Component class, attaches to Entities
| `System` | Processes given Components every `tick` or `update`.
| `Assemblage` | Template that attaches a collection of Components.
| `Entity Manager` | Manages, instantiates and keeps track of Entities.

### Entity
| Member | Description |
| ---- | ---- |
| Entity.`id` | Last id used
| Entity.`list` | List of all current Entities
| #`id` | Numeric id that represents this entity across entire system
| #`name` | Entity's given name
| #`components` | Map of all Components keyed by ComponentType label
| #`template` | Template used to build Entity
| Entity.`get` | Find Entity by name or id
| Entity.`print` | Print list of all Entities
| #`get` | Get component by component label
| #`add` | Add component by component label
| #`remove` | Delete all components that match given string and this id
| **#`has`** | NYI
| **#`delete`** | NYI
| **#`toJSON`** | NYI

### Component
| Member | Description
| ---- | ---- |
| Component.`types` |
| Component.label |
| #`label` |
| Component.Builder |
| #`eid` |
| #`initialize` |
| #`getComponentType` |
| Component.`get` | Shortcut to Component.types.get()

### ComponentType
| Member | Description
| ---- | ---- |
| ComponentType.`label` |
| ComponentType.`list` |
| ComponentType.`systems` | NYI Map -- Necessary?

### System
| Member | Description
| ---- | ---- |
| #`label` | System Label
| #`components` | Map of components keyed by label
| #`update` | Update function called on system with static call if active
| #`tick` | Tick function called with system
| #`hooks` | Hooks for Commands to catch
| #`execute` | Calls Execute function through hooks
| #`register` | Registers new component to system
| #`deregister` | Deregister components from system
| System.`active` | Set of all active systems, updated every tick
| System.`list` | Map of all systems keyed by name
| System.`update` | Parent Update function that updates all systems
| System.`tick` | Parent Tick function that ticks all systems

---

### Assemblage
| Member | Description
| ---- | ---- |
| ??? | ???

### Entity Manager
| Member | Description
| ---- | ---- |
| ??? | ???

### Template (?)
| Member | Description
| ---- | ---- |
| ??? | ???


