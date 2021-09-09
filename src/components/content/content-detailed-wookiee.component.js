/* eslint-disable no-unused-vars */

import React from 'react'
import PropTypes from 'prop-types'

import Card from 'components/ui/card/card.component'

const ContentDetailedWookieeComponent = ({
  content: {
    acooscwoohoorcanwa,
    acraahrc_oaooanoorc,
    acwoahrracao,
    cakwooaahwoc,
    caorarccacahakc,
    corahwh_oaooanoorc,
    howoacahoaanwoc,
    hurcan,
    oarcworaaowowa,
    rhahrcaoac_roworarc,
    rrwowhwaworc,
    scracc,
    whrascwo,
    worowo_oaooanoorc,
    wowaahaowowa,
    wwahanscc
  }
}) => {
  function arrayProps (props) {
    if (typeof props === 'object') {
      return (
        props &&
        props.map((prop) => {
          return (
            <section key={prop} style={{ display: 'flex', flexWrap: 'wrap' }}>
              <a
                className="url-externe"
                href={prop}
                target="_blank"
                rel="noreferrer"
                title="lien-externe"
              >
                <span>{prop}</span>
              </a>
            </section>
          )
        })
      )
    }
  }
  return (
    <article className="content-detailed">
      <Card maxWidth="1000px">
        <ul>
          {acooscwoohoorcanwa && (
            <li>
              acooscwoohoorcanwa: <span>{acooscwoohoorcanwa}</span>
            </li>
          )}
          {acraahrc_oaooanoorc && (
            <li>
              acraahrc_oaooanoorc:<span> {acraahrc_oaooanoorc}</span>
            </li>
          )}
          {acwoahrracao && (
            <li>
              acwoahrracao:<span> {acwoahrracao}</span>
            </li>
          )}
          {cakwooaahwoc && (
            <li>
              cakwooaahwoc:<span> {arrayProps(cakwooaahwoc)}</span>
            </li>
          )}

          {caorarccacahakc && <li>caorarccacahakc: {caorarccacahakc}</li>}
          {corahwh_oaooanoorc && (
            <li>
              corahwh_oaooanoorc: <span>{corahwh_oaooanoorc}</span>
            </li>
          )}
          {howoacahoaanwoc && (
            <li>
              howoacahoaanwoc: <span>{howoacahoaanwoc}</span>
            </li>
          )}
          {hurcan && (
            <li>
              hurcan: <span>{hurcan}</span>
            </li>
          )}
          {oarcworaaowowa && (
            <li>
              oarcworaaowowa: <span>{oarcworaaowowa}</span>
            </li>
          )}
          {rhahrcaoac_roworarc && (
            <li>
              rhahrcaoac_roworarc: <span>{rhahrcaoac_roworarc}</span>
            </li>
          )}
          {rrwowhwaworc && (
            <li>
              rrwowhwaworc: <span>{rrwowhwaworc}</span>
            </li>
          )}
          {scracc && (
            <li>
              scracc: <span>{scracc}</span>
            </li>
          )}
          {whrascwo && (
            <li>
              whrascwo: <span>{whrascwo}</span>
            </li>
          )}
          {worowo_oaooanoorc && (
            <li>
              worowo_oaooanoorc: <span>{worowo_oaooanoorc}</span>
            </li>
          )}
          {wowaahaowowa && (
            <li>
              wowaahaowowa: <span>{wowaahaowowa}</span>
            </li>
          )}
          {wwahanscc && (
            <li>
              wwahanscc: <span>{arrayProps(wwahanscc)}</span>
            </li>
          )}
        </ul>
      </Card>
    </article>
  )
}
ContentDetailedWookieeComponent.propTypes = {
  name: PropTypes.string
}

export default ContentDetailedWookieeComponent
