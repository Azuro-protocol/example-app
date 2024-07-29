/* eslint-disable */
import _sport_Soon from '../../../../public/images/icons/sport/Soon.svg?url'
import _sport_SoonSource from '!!raw-loader!../../../../public/images/icons/sport/Soon.svg'
import _sport_american_football from '../../../../public/images/icons/sport/american-football.svg?url'
import _sport_american_footballSource from '!!raw-loader!../../../../public/images/icons/sport/american-football.svg'
import _sport_baseball from '../../../../public/images/icons/sport/baseball.svg?url'
import _sport_baseballSource from '!!raw-loader!../../../../public/images/icons/sport/baseball.svg'
import _sport_basketball from '../../../../public/images/icons/sport/basketball.svg?url'
import _sport_basketballSource from '!!raw-loader!../../../../public/images/icons/sport/basketball.svg'
import _sport_boxing from '../../../../public/images/icons/sport/boxing.svg?url'
import _sport_boxingSource from '!!raw-loader!../../../../public/images/icons/sport/boxing.svg'
import _sport_cricket from '../../../../public/images/icons/sport/cricket.svg?url'
import _sport_cricketSource from '!!raw-loader!../../../../public/images/icons/sport/cricket.svg'
import _sport_crypto from '../../../../public/images/icons/sport/crypto.svg?url'
import _sport_cryptoSource from '!!raw-loader!../../../../public/images/icons/sport/crypto.svg'
import _sport_esports from '../../../../public/images/icons/sport/esports.svg?url'
import _sport_esportsSource from '!!raw-loader!../../../../public/images/icons/sport/esports.svg'
import _sport_football from '../../../../public/images/icons/sport/football.svg?url'
import _sport_footballSource from '!!raw-loader!../../../../public/images/icons/sport/football.svg'
import _sport_ice_hockey from '../../../../public/images/icons/sport/ice-hockey.svg?url'
import _sport_ice_hockeySource from '!!raw-loader!../../../../public/images/icons/sport/ice-hockey.svg'
import _sport_mma from '../../../../public/images/icons/sport/mma.svg?url'
import _sport_mmaSource from '!!raw-loader!../../../../public/images/icons/sport/mma.svg'
import _sport_other from '../../../../public/images/icons/sport/other.svg?url'
import _sport_otherSource from '!!raw-loader!../../../../public/images/icons/sport/other.svg'
import _sport_politics from '../../../../public/images/icons/sport/politics.svg?url'
import _sport_politicsSource from '!!raw-loader!../../../../public/images/icons/sport/politics.svg'
import _sport_rugby_league from '../../../../public/images/icons/sport/rugby-league.svg?url'
import _sport_rugby_leagueSource from '!!raw-loader!../../../../public/images/icons/sport/rugby-league.svg'
import _sport_rugby_union from '../../../../public/images/icons/sport/rugby-union.svg?url'
import _sport_rugby_unionSource from '!!raw-loader!../../../../public/images/icons/sport/rugby-union.svg'
import _sport_tennis from '../../../../public/images/icons/sport/tennis.svg?url'
import _sport_tennisSource from '!!raw-loader!../../../../public/images/icons/sport/tennis.svg'
import _interface_close from '../../../../public/images/icons/interface/close.svg?url'
import _interface_closeSource from '!!raw-loader!../../../../public/images/icons/interface/close.svg'
import _interface_copy from '../../../../public/images/icons/interface/copy.svg?url'
import _interface_copySource from '!!raw-loader!../../../../public/images/icons/interface/copy.svg'
import _interface_spinner from '../../../../public/images/icons/interface/spinner.svg?url'
import _interface_spinnerSource from '!!raw-loader!../../../../public/images/icons/interface/spinner.svg'

const isServer = typeof window === 'undefined'

const icons = {
  'sport/Soon': { src: _sport_Soon.src, source: isServer && _sport_SoonSource, width: _sport_Soon.width, height: _sport_Soon.height, aspect: _sport_Soon.width/_sport_Soon.height }, 
  'sport/american-football': { src: _sport_american_football.src, source: isServer && _sport_american_footballSource, width: _sport_american_football.width, height: _sport_american_football.height, aspect: _sport_american_football.width/_sport_american_football.height }, 
  'sport/baseball': { src: _sport_baseball.src, source: isServer && _sport_baseballSource, width: _sport_baseball.width, height: _sport_baseball.height, aspect: _sport_baseball.width/_sport_baseball.height }, 
  'sport/basketball': { src: _sport_basketball.src, source: isServer && _sport_basketballSource, width: _sport_basketball.width, height: _sport_basketball.height, aspect: _sport_basketball.width/_sport_basketball.height }, 
  'sport/boxing': { src: _sport_boxing.src, source: isServer && _sport_boxingSource, width: _sport_boxing.width, height: _sport_boxing.height, aspect: _sport_boxing.width/_sport_boxing.height }, 
  'sport/cricket': { src: _sport_cricket.src, source: isServer && _sport_cricketSource, width: _sport_cricket.width, height: _sport_cricket.height, aspect: _sport_cricket.width/_sport_cricket.height }, 
  'sport/crypto': { src: _sport_crypto.src, source: isServer && _sport_cryptoSource, width: _sport_crypto.width, height: _sport_crypto.height, aspect: _sport_crypto.width/_sport_crypto.height }, 
  'sport/esports': { src: _sport_esports.src, source: isServer && _sport_esportsSource, width: _sport_esports.width, height: _sport_esports.height, aspect: _sport_esports.width/_sport_esports.height }, 
  'sport/football': { src: _sport_football.src, source: isServer && _sport_footballSource, width: _sport_football.width, height: _sport_football.height, aspect: _sport_football.width/_sport_football.height }, 
  'sport/ice-hockey': { src: _sport_ice_hockey.src, source: isServer && _sport_ice_hockeySource, width: _sport_ice_hockey.width, height: _sport_ice_hockey.height, aspect: _sport_ice_hockey.width/_sport_ice_hockey.height }, 
  'sport/mma': { src: _sport_mma.src, source: isServer && _sport_mmaSource, width: _sport_mma.width, height: _sport_mma.height, aspect: _sport_mma.width/_sport_mma.height }, 
  'sport/other': { src: _sport_other.src, source: isServer && _sport_otherSource, width: _sport_other.width, height: _sport_other.height, aspect: _sport_other.width/_sport_other.height }, 
  'sport/politics': { src: _sport_politics.src, source: isServer && _sport_politicsSource, width: _sport_politics.width, height: _sport_politics.height, aspect: _sport_politics.width/_sport_politics.height }, 
  'sport/rugby-league': { src: _sport_rugby_league.src, source: isServer && _sport_rugby_leagueSource, width: _sport_rugby_league.width, height: _sport_rugby_league.height, aspect: _sport_rugby_league.width/_sport_rugby_league.height }, 
  'sport/rugby-union': { src: _sport_rugby_union.src, source: isServer && _sport_rugby_unionSource, width: _sport_rugby_union.width, height: _sport_rugby_union.height, aspect: _sport_rugby_union.width/_sport_rugby_union.height }, 
  'sport/tennis': { src: _sport_tennis.src, source: isServer && _sport_tennisSource, width: _sport_tennis.width, height: _sport_tennis.height, aspect: _sport_tennis.width/_sport_tennis.height }, 
  'interface/close': { src: _interface_close.src, source: isServer && _interface_closeSource, width: _interface_close.width, height: _interface_close.height, aspect: _interface_close.width/_interface_close.height }, 
  'interface/copy': { src: _interface_copy.src, source: isServer && _interface_copySource, width: _interface_copy.width, height: _interface_copy.height, aspect: _interface_copy.width/_interface_copy.height }, 
  'interface/spinner': { src: _interface_spinner.src, source: isServer && _interface_spinnerSource, width: _interface_spinner.width, height: _interface_spinner.height, aspect: _interface_spinner.width/_interface_spinner.height }
} as const

export type IconName = keyof typeof icons
export default icons