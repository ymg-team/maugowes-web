import React from "react"
import Styled from "styled-components"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import GA from "../../components/boxs/GA"
import InputText from "../../components/form/InputText"
import InputFile from "../../components/form/InputFile"
import InputLocation from "../../components/form/InputLocation"
import InputDateTime from "../../components/form/InputDateTime"
import Submit from "../../components/form/Submit"
import FormStyled from "../../components/form/FormStyled"

const SendCompetitionStyled = Styled.div`
`

class SendEvent extends React.Component {
  state = {
    event_time: new Date()
  }

  submitHandler() {
    let params = {
      email: this.state.email,
      title: this.state.title,
      link: this.state.link,
      event_time: typeof this.state.event_time == "number" ? this.state.event_time : this.state.event_time.getTime()
    }

    if(this.state.poster) params.poster = this.state.poster
    if(this.state.address) params.address = this.state.address
    if(this.state.coords) params.coords = this.state.coords
    if(this.state.note) params.note = this.state.note

    console.log("params", params)
  }

  render() {
    const metadata = {
      title: "Kirim Events - Mau Gowes",
      description:
        "Yuk sebarkan event sepeda di form ini, event akan tampil setelah mendapatkan persetujuan dari moderator"
    }
    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <SendCompetitionStyled>
            <Header
              title="Events"
              text={metadata.description}
              backgroundImage="https://images.unsplash.com/photo-1558009525-29a300db7b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
            />
            <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />

            {/* form send event */}
            <div className="grid-center">
              <div className="col-6 super-login-wrapper">
                <FormStyled>
                  <h2>Data Kamu (kami akan menjaga kerahasiaan data ini)</h2>
                  <InputText
                    label="Email kamu (untuk pemberitahuan status event ini)"
                    type="email"
                    value={this.state.email || ""}
                    validate={this.state.email_validate || {}}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    name="email"
                    required
                  />

                  <h2>Tentang Event Gowes</h2>
                  <InputText
                    label="Judul Event Gowes"
                    type="text"
                    value={this.state.title || ""}
                    validate={this.state.title_validate || {}}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    name="title"
                    required
                  />
                  <InputDateTime 
                    label="Waktu Event Gowes"
                    name="event_time"
                    defaultValue={this.state.event_time}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    required
                  />
                  <InputLocation
                    name="location"
                    label="Lokasi Start / Meetpoint Gowes"
                    setState={(n, cb) => this.setState(n, cb)}
                  />
                  <InputText
                    label="Link website / sosial media"
                    type="url"
                    value={this.state.link || ""}
                    validate={this.state.link_validate || {}}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    name="link"
                    required
                  />
                  <InputText
                    label="Catatan untuk peserta"
                    type="text"
                    value={this.state.note || ""}
                    validate={this.state.note_validate || {}}
                    setState={(ns, cb) => this.setState(ns, cb)}
                    name="note"
                  />
                  <InputFile
                    label="Poster"
                    name="poster"
                    id="input-poster"
                    value={this.state.poster || ""}
                    validate={this.state.poster_validate || {}}
                    setState={(n, cb) => this.setState(n, cb)}
                  />
                  <Submit
                    onClick={() => this.submitHandler()}
                    loading={false}
                    text="Kirim Event"
                    requiredInputs={["title", "link", "email"]}
                    setState={(ns, cb) => this.setState(ns, cb)}
                  />
                </FormStyled>
              </div>
            </div>
            {/* end of form send event */}

            <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />
          </SendCompetitionStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default SendEvent