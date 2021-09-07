
import React from 'react'
import PropTypes from 'prop-types'

import Card from '../ui/card/card.component'

const ContentDetailedComponent = ({
  content: {
    name,
    title,
    birth_year,
    created,
    edited,
    eye_color,
    films,
    gender,
    hair_color,
    height,
    homeworld,
    mass,
    skin_color,
    species,
    starships,
    url,
    vehicles
  }
}) => {
  function arrayProps (props) {
    if (typeof props === 'object') {
      return (
        props &&
        props.map((prop) => {
          return (
            <ul key={prop}>
              <li>
                <a
                  className="url-externe"
                  href={prop}
                  target="_blank"
                  rel="noreferrer"
                  title="lien-externe"
                >
                  <span>{prop}</span>
                </a>
              </li>
            </ul>
          )
        })
      )
    }
  }
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return (
    <article className="content-detailed">
      <Card>
        <ul>
          <li>
            Nom: <span>{name || title}</span>
          </li>
          {birth_year && (
            <li>
              Année de naissance:<span> {birth_year}</span>
            </li>
          )}
          <li>
            Créé:
            <span> {new Date(created).toLocaleDateString('fr', options)}</span>
          </li>
          <li>
            {' '}
            Editée:
            <span> {new Date(edited).toLocaleDateString('fr', options)}</span>
          </li>
          {eye_color && (
            <li>
              {' '}
              Couleur des yeux:<span> {eye_color}</span>
            </li>
          )}

          {gender && (
            <li>
              Genre:<span> {gender}</span>
            </li>
          )}
          {hair_color && (
            <li>
              Couleur de cheveux:<span> {hair_color}</span>
            </li>
          )}
          {height && (
            <li>
              Taille:<span> {height}</span>
            </li>
          )}
          {homeworld && (
            <li>
              Provenance:{' '}
              <a
                className="url-externe"
                href={homeworld}
                target="_blank"
                rel="noreferrer"
                title="lien-externe"
              >
                <span> {homeworld}</span>
              </a>
            </li>
          )}
          {mass && (
            <li>
              Masse:<span> {mass}</span>
            </li>
          )}
          {skin_color && (
            <li>
              {' '}
              Couleur de peau:<span> {skin_color}</span>
            </li>
          )}
          {species && species.length
            ? (
            <li>
              {' '}
              Espèce:<span>{arrayProps(species)}</span>
            </li>
              )
            : null}
        </ul>
      </Card>
      <Card>
        <ul>
          {films && (
            <li>
              Films:<span> {arrayProps(films)}</span>
            </li>
          )}
          {starships && starships.length
            ? (
            <li>
              {' '}
              Vaisseau:<span> {arrayProps(starships)}</span>
            </li>
              )
            : null}
          {url && (
            <li>
              {' '}
              Url:{' '}
              <a
                className="url-externe"
                href={url}
                target="_blank"
                rel="noreferrer"
                title="lien-externe"
              >
                <span> {url}</span>
              </a>
            </li>
          )}
          {vehicles && vehicles.length
            ? (
            <li>
              {' '}
              Véhicules:<span> {arrayProps(vehicles)}</span>
            </li>
              )
            : null}
        </ul>
      </Card>
    </article>
  )
}
ContentDetailedComponent.propTypes = {
  name: PropTypes.string
}

export default ContentDetailedComponent
