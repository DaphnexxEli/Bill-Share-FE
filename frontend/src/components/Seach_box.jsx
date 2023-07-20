import React, { useState } from 'react';

export const Search_box = ({ onSearch }) => {

    this.state = {
        data:["1","2"]
    }

    var indents = [];
    for (var i = 0; i < this.state.data; i++) {
      indents.push(<span className='indent' key={i}></span>);
    }

    return (
       <div>
        {indents}
        "Some text value"
       </div>
    );
};


