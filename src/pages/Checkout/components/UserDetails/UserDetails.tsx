import { MapPin } from 'phosphor-react'
import { UserDetailsContainer } from '../../styles'
import { ChangeEvent } from 'react'
import { UserDetails } from '../../../../contexts/ItemsContext'

interface UserDetailsProps {
  getUserDetails: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
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
            type="number"
            min={1}
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
          {/* <input
            type="select"
            className={invalidFields.uf ? 'input-error item uf' : 'item uf'}
            placeholder="UF"
            name="uf"
            value={userDetails.uf}
            onChange={getUserDetails}
          /> */}
          <select
            name="uf"
            className={invalidFields.uf ? 'input-error item uf' : 'item uf'}
            value={userDetails.uf}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => getUserDetails(e)}
          >
            <option value="">UF</option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
          </select>
        </fieldset>
      </form>
    </UserDetailsContainer>
  )
}
