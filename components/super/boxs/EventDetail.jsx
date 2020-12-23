import React, { useEffect } from "react"
import { connect } from "react-redux"
import Style from "styled-components"
import { nl2br } from "string-manager"

//actions
import { setStatus } from "../../../redux/events/actions"

// components
import InputLocation from "../../form/InputLocation"
import DayJs from "../../../modules/dayjs"
import Submit from "../../form/Submit"
import Label from "../../labels"
const EventDetailStyle = Style.div`
	.text-bold{
		font-weight: bold;
	}
	.d-flex{
		display: flex;
  }
  
  .mb-25{
    margin-bottom: 25px;
  }
`

const EventDetail = (props) => {
  const { formResponse, eventData } = props
  const is_loading = formResponse.is_loading || formResponse.status == 200

  useEffect(() => {
    if (formResponse.status === 200 || formResponse.status === 201) {
      location.href = `/super/events/detail/${eventData.id}`
    }
  }, [formResponse])

  const handleClick = (state) => {
    let note = ""
    if (status === "reject") {
      const prompt = window.prompt("Alasan ditolak")
      if (prompt !== null) {
        note = prompt
      }
    }
    const formData = {
      status,
      note,
    }
    props.dispatch(setStatus(props.eventData.id, formData))
  }

  return (
    <EventDetailStyle>
      <div className="grid mb-25">
        <div className="col-3 text-bold">Title</div>
        <div className="col-9">{eventData.title}</div>
      </div>
      <div className="grid mb-25">
        <div className="col-3 text-bold">Status</div>
        <div className="col-9">
          <Label status={eventData.event_status} />
        </div>
      </div>
      <div className="grid mb-25">
        <div className="col-3 text-bold">Note</div>
        <div
          className="col-9"
          dangerouslySetInnerHTML={{
            __html:
              eventData.note && eventData.note.trim()
                ? nl2br(eventData.note)
                : "-",
          }}
        />
      </div>
      <div className="grid mb-25">
        <div className="col-3 text-bold">Event Date</div>
        <div className="col-9">
          {DayJs(eventData.start_time).format("DD MMMM YYYY HH:mm")}
        </div>
      </div>
      <div className="grid mb-25">
        <div className="col-3 text-bold">Event Link</div>
        <div className="col-9">
          {eventData.event_link ? (
            <a href={eventData.event_link} target="_blank">
              {eventData.event_link}
            </a>
          ) : (
            "-"
          )}
        </div>
      </div>
      {/* event start location row */}
      <div className="grid mb-25">
        <div className="col-3 text-bold">Event Location</div>
        <div className="col-9">
          {eventData.is_virtual
            ? "Virtual Event"
            : eventData.location.address || "-"}
        </div>
      </div>
      {eventData.is_virtual ? null : (
        <>
          <div className="grid mb-25">
            <div className="col-3" />
            <div className="col-9">
              <InputLocation
                readOnly
                coordinate={eventData.location.coordinate}
              />
              <a
                href={`https://maps.google.com/maps?q=${eventData.location.coordinate.lat},${eventData.location.coordinate.lng}`}
                target="_blank"
                rel="noopener noreferer">
                Lihat di Google Maps
              </a>
            </div>
          </div>
          {/* end of event start location row */}
        </>
      )}
      {/* event gpx */}
      {eventData.is_virtual ? null : (
        <div className="grid mb-25">
          <div className="col-3 text-bold">Event GPX</div>
          <div className="col-9">
            {eventData.geoJSON ? (
              <InputLocation
                name="geoJSON"
                readOnly
                coordinate={eventData.location.coordinate}
                geoJSON={eventData.geoJSON}
              />
            ) : (
              "-"
            )}
          </div>
        </div>
      )}
      {/* end of event gpx */}
      <div className="grid">
        <div
          className="col-9 d-flex"
          data-push-left="off-3"
          style={{ position: "relative" }}>
          {/* show on waiting and accept */}
          {eventData.event_status == "accept" ||
          eventData.event_status != "reject" ? (
            <Submit
              onClick={() => handleClick("reject")}
              loading={is_loading}
              color="red"
              text="Tolak"
              style={{ marginRight: 10 }}
            />
          ) : null}
          &nbsp;
          {eventData.event_status == "reject" ||
          eventData.event_status != "accept" ? (
            <Submit
              onClick={() => handleClick("accept")}
              loading={is_loading}
              text="Terima"
              color="white"
              style={{ marginRight: 10 }}
            />
          ) : null}
          {/* link to update event */}
          <a
            style={{ position: "absolute", right: 0, top: "30%" }}
            href={`/super/events/edit/${eventData.id}`}
            rel="noreferer noopener">
            Update Event
          </a>
        </div>
      </div>
    </EventDetailStyle>
  )
}

export default connect((state) => {
  return {}
})(EventDetail)
