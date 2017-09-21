import React, { Component } from 'react';
import styles from './styles';

class Zone extends Component{
  
  onSelectTitle(event){
    event.preventDefault(); // stops page jumping
    this.props.select(this.props.index);
  }
  
  render(){
    const zoneStyle = styles.zone;
    const zipCode = this.props.currentZone.zipCodes[0];
    const title = (this.props.isSelected) ? 
      <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a> :
      <a href="#">{this.props.currentZone.name}</a>     
    
    return(
      <div style={zoneStyle.container}>
        <h2 onClick={this.onSelectTitle.bind(this)} style={zoneStyle.header}>
          {title}
        </h2>
        <span>{zipCode}</span><br />
        <span>{this.props.currentZone.comments} comments</span>
      </div>
    );
  }
}

export default Zone;