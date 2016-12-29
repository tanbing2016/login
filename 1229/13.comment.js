let Board = React.createClass({
    getInitialState(){
        return {words:[]};
    },
    handelClick(){
        var val=this.refs.myText.value;
        this.setState({words:this.state.words.concat(val)});
        this.refs.myText.value="";
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.words.map((item,index)=><li key={index} className="list-group-item">{item}</li>)
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input ref="myText" type="text" className="form-control"/>
                    <button onClick={this.handelClick} className="btn btn-primary">留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));