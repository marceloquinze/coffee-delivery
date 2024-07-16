import { MapPin } from 'phosphor-react'
import { UserDetailsContainer } from '../../styles'
import { ChangeEvent } from 'react'
import { UserDetails } from '../../../../contexts/ItemsContext'

interface UserDetailsProps {
  getUserDetails: (e: ChangeEvent<HTMLInputElement>) => void
  userDetails: UserDetails
  invalidFields: { [key: string]: boolean }
}

export function UserDetailsComp({
  getUserDetails,
  userDetails,
  invalidFields,
}: UserDetailsProps) {
  return (
    <UserDetailsContainer>
      <h4>
        <MapPin size={22} />
        Delivery Address
      </h4>
      <p>Enter the address where you want to receive your order</p>
      <form>
        <input
          type="text"
          className={invalidFields.cep ? 'input-error item cep' : 'item cep'}
          placeholder="CEP"
          name="cep"
          value={userDetails.cep}
          onChange={getUserDetails}
        />
        <input
          type="text"
          className={
            invalidFields.street ? 'input-error item street' : 'item street'
          }
          placeholder="Street"
          name="street"
          value={userDetails.street}
          onChange={getUserDetails}
        />
        <fieldset className="fieldset1">
          <input
            type="text"
            className={
              invalidFields.number ? 'input-error item number' : 'item number'
            }
            placeholder="Number"
            name="number"
            value={userDetails.number}
            onChange={getUserDetails}
          />
          <input
            type="text"
            className="item complement"
            placeholder="Complement"
            name="complement"
            value={userDetails.complement}
            onChange={getUserDetails}
          />
        </fieldset>
        <fieldset className="fieldset2">
          <input
            type="text"
            className={
              invalidFields.neighborhood
                ? 'input-error item neighborhood'
                : 'item neighborhood'
            }
            placeholder="Neighborhood"
            name="neighborhood"
            value={userDetails.neighborhood}
            onChange={getUserDetails}
          />
          <input
            type="text"
            className={
              invalidFields.city ? 'input-error item city' : 'item city'
            }
            placeholder="City"
            name="city"
            value={userDetails.city}
            onChange={getUserDetails}
          />
          <input
            type="text"
            className={invalidFields.uf ? 'input-error item uf' : 'item uf'}
            placeholder="UF"
            name="uf"
            value={userDetails.uf}
            onChange={getUserDetails}
          />
        </fieldset>
      </form>
    </UserDetailsContainer>
  )
}
