const boardContainer = document.getElementById("board");


const Card = (props) => (
  <div className = "card">
    <h3>{ props.card.title }</h3>
    <p>{ props.card.priority }</p>
    <p>{ props.card.status}</p>
    <p>{ props.card.created_by }</p>
    <p>{ props.card.assigned_to }</p>
    <p>{ props.card.id }</p>
    <button id="backward" onClick = { props.backward.bind(this, props.card.id) }>backward</button>
    <button id="forward" onClick = { props.forward.bind(this, props.card.id) }>forward</button>
  </div>
);

const CardList = ({ cards, forward, backward }) => (
  <ul>
    { cards
      .map( card => <Card card={card} forward={forward} backward={backward} /> )
    }
  </ul>
);


class Cards extends React.Component {

}

class DoneColumn extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div>
          <div className="done">
            <p>Done</p>
            <CardList cards={this.props.done} forward={this.props.forward} backward={this.props.moveBackwardProgress}></CardList>
          </div>
        </div>

    )
  }
}

class ProgressColumn extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div>
          <div className="progress">
            <p>In Progress</p>
            <CardList cards={this.props.progress} forward={this.props.moveForwardDone} backward={this.props.backward}></CardList>
          </div>
        </div>
    )
  }
}

class QueueColumn extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props);
    return (
        <div>
          <div className="queue">
            <p>To Do</p>
            <CardList cards={this.props.todo} forward={this.props.moveForward} backward={this.props.backward} ></CardList>
          </div>
        </div>
    )
  }
}

class NewCardForm extends React.Component{
  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      title: "",
      priority: "",
      status: "Queue",
      created_by: "",
      assigned_to: "",
      id: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addCard(card){
    console.log(card);
    // update my parent's card state
    this.props.addCard(card);

    const title = "";
    const priority = "";
    const created_by = "";
    const assigned_to = "";
    const id = "";

    this.setState({
      title,
      priority,
      status,
      created_by,
      assigned_to,
      id
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addCard(this.state);
  }

  handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }

  handleCreatedByChange(event) {
    this.setState({ created_by : event.target.value });
  }

  handleAssignedToChange(event) {
    this.setState({ assigned_to : event.target.value });
  }

  handleIdChange(event) {
    this.setState({ id : event.target.value });
  }

  handleStatusChange(event) {
    this.setState({ status : event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div>
          <input type="text" placeholder="priority" onChange={this.handlePriorityChange} value={this.state.priority} />
        </div>
        <div>
          <input type="text" placeholder="created by" onChange={this.handleCreatedByChange} value={this.state.created_by} />
        </div>
        <div>
          <input type="text" placeholder="assigned to" onChange={this.handleAssignedToChange} value={this.state.assigned_to} />
        </div>
        <div>
          <input type="text" placeholder="id" onChange={this.handleIdChange} value={this.state.id} />
        </div>
        <div>
          <button type="submit">Add Card</button>
        </div>
      </form>
    )
  }

}

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cards: [],
      todo: [],
      progress: [],
      done: []
    };

    this.addCard = this.addCard.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveForwardDone = this.moveForwardDone.bind(this);
    this.moveBackwardProgress = this.moveBackwardProgress.bind(this);
  }

  addCard(card){
    console.log(card);
    this.setState({
      todo : this.state.todo.concat(card)
    });
  }

  moveForward(id){
    let index, card;
    let todoArray = this.state.todo

    this.state.todo.forEach((currentCard, cardIndex) => {
      if(currentCard.id === id){
        index = cardIndex;
        card = currentCard;
        card.status = "In Progress"
      }
    })

    let removeTodo = this.state.todo.slice(0, index)
                     .concat(this.state.todo.slice(index+ 1, todoArray.length));
    let addProgress = this.state.progress.concat([card]);

    this.setState({
      todo : removeTodo,
      progress : addProgress,
    })

  }

  moveForwardDone(id){
    let index, card;
    let progressArray = this.state.progress

    this.state.progress.forEach((currentCard, cardIndex) => {
      if(currentCard.id === id){
        index = cardIndex;
        card = currentCard;
        card.status = "Done"
      }
    })

    let removeProgress = this.state.progress.slice(0, index)
                     .concat(this.state.progress.slice(index+ 1, progressArray.length));
    let addDone = this.state.done.concat([card]);

    this.setState({
      progress : removeProgress,
      done : addDone,
    })

  }

  moveBackwardProgress(id){
    let index, card;
    let doneArray = this.state.done

    this.state.done.forEach((currentCard, cardIndex) => {
      if(currentCard.id === id){
        index = cardIndex;
        card = currentCard;
        card.status = "Progress"
      }
    })

    let removeDone = this.state.done.slice(0, index)
                     .concat(this.state.done.slice(index+ 1, doneArray.length));
    let addProgress = this.state.progress.concat([card]);

    this.setState({
      progress : addProgress,
      done : removeDone,
    })

  }

  componentWillMount() {
    const todo = [];
    const progress = [];
    const done = [];
    let allCards = this.state.cards;

     for(var i = 0; i<allCards.length; i++){
      if (allCards[i].status === "Queue"){
        todo.push(allCards[i]);
      }
      if (allCards[i].status === "In Progress"){
        progress.push(allCards[i]);
      }
      if (allCards[i].status === "Complete"){
        done.push(allCards[i]);
      }
     }

     this.setState({
      todo: todo,
      progress: progress,
      done: done
    })
  }

  render(){

    return (
      <div>
        <h1>Kanban Board</h1>
        <NewCardForm addCard={this.addCard}/>
        <QueueColumn todo={this.state.todo} backward= {()=> {}} moveForward={this.moveForward} />
        <ProgressColumn progress={this.state.progress} backward= {()=> {}} moveForwardDone={this.moveForwardDone} />
        <DoneColumn done={this.state.done} forward= {()=> {}}moveBackwardProgress={this.moveBackwardProgress} />
      </div>
    );
  }

  }

ReactDOM.render(
  // component to render
  <App />,

  // where to inject this component
  // dom element, or use getElementById
  boardContainer
);