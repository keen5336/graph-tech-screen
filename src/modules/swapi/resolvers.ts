import { Context } from 'apollo-server-core'
import { GraphQLFieldResolver } from 'graphql'

type Args = { id: string }

interface Character {
	name: string
	height: string
	mass: string
	gender: string
}

const genderMap: { [key: string]: string } = {
	male: 'MALE',
	female: 'FEMALE',
}

const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
	swapiCharacterById: async (_, args: Args, ctx) => {
		const response = await fetch(`https://swapi.dev/api/people/${args.id}/`)
		const data: Character = await response.json()
		return {
			name: data.name,
			height: data.height,
			mass: data.mass,
			gender: data.gender,
		}
	},
}

const StarWarsCharacter = {
	name: (parent: Character) => {
		return parent.name
	},
	height: (parent: Character) => {
		return parent.height
	},
	mass: (parent: Character) => {
		return parent.mass
	},
	gender: (parent: Character) => {
		return genderMap[parent.gender.toLowerCase()] || null
	},
}

export default {
	Query,
	StarWarsCharacter,
}
