

// eslint-disable-next-line react/prop-types
const ResultsCard = ({ showAnswer }) => {
    return (
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
            {/* eslint-disable-next-line react/prop-types */}
            {showAnswer.map(item => (
                <div key={item.id} className="card" style={{ width: "16rem" }}>

                    <div className="card-body">
                        <h5 className="card-title">Quiz ID: {item?.id}</h5>
                        <a href="#" className="btn btn-primary">Go</a>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default ResultsCard