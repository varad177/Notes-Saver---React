import React from 'react'

const Aleart = (props) => {
    return (
        <div>
          {props.alert &&  <div className="alert alert-primary" role="alert">
                {props.alert.msg}
            </div>}

        </div>
    )
}

export default Aleart
