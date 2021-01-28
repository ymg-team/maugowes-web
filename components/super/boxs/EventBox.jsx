// components
import Button from "../../buttons/index"
import Table from "../tables/TableWrapper"
import Loader from "../../Loader"
import EventRow from "../tables/rows/EventRow"

const EventBox = (props) => {
  const { results, status, is_loading, total } = props.data

  return (
    <>
      {results && results.length && total && !props.noStats ? (
        <React.Fragment>
          Menampilkan <strong>{results.length || 0}</strong> dari{" "}
          <strong>{total}</strong> events
        </React.Fragment>
      ) : null}

      <Table>
        {status
          ? results && results.length > 0
            ? results.map((n, key) => <EventRow key={key} data={n} />)
            : null
          : null}
      </Table>

      {is_loading || !status ? <Loader /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length >= props.maxResults ? (
        <div className="grid-center" style={{ margin: "20px 0 40px" }}>
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Postingan Berikutnya" : "Loading..."}
            size="large"
            onClick={() => {
              props.loadmoreHandler()
            }}
          />
        </div>
      ) : null}
    </>
  )
}

export default EventBox
