import type { Bridge, CommunicationIds } from './bridge'
import type { Message } from './message'

export enum StakingAirdrop {
    Assembly = 'assembly',
    Shimmer = 'shimmer',
}

export enum ParticipationAction {
    Stake = 'stake',
    Unstake = 'unstake',
    Vote = 'vote',
    Unvote = 'unvote',
}

export enum ParticipationEventState {
    Upcoming = 'upcoming',
    Commencing = 'commencing',
    Holding = 'holding',
    Ended = 'ended',
    Inactive = 'inactive',
}

export type ParticipationEventStatus = {
    milestoneIndex: number
    /**
     * CAUTION: Ideally this property should be named
     * "state" to avoid confusion, but this is not possible
     * because of deserialization wallet.rs-side.
     */
    status: ParticipationEventState
    checksum: string
}

export type ParticipationEventInformation = {
    milestoneIndexCommence: number
    milestoneIndexStart: number
    milestoneIndexEnd: number
    additionalInfo: string
}

export type ParticipationEvent = {
    eventId: string
    information: ParticipationEventInformation
    /**
     * CAUTION: Be careful not to confuse this
     * property with the nested "status" property
     * on this type.
     */
    status: ParticipationEventStatus
}

export type ParticipateResponsePayload = Message[]
// export interface ParticipateResponsePayload {
//     accountId: string
//     messages: Message[]
// }

export type Participation = {
    eventId: string
    answers: string[]
}

export type AccountParticipationOverview = {
    accountIndex: number
    assemblyRewards: number
    assemblyRewardsBelowMinimum: number
    assemblyStakedFunds: number
    assemblyUnstakedFunds: number
    shimmerRewards: number
    shimmerRewardsBelowMinimum: number
    shimmerStakedFunds: number
    shimmerUnstakedFunds: number
    participations: Participation[]
}

// TODO: Change wallet.rs to return array directly instead of wrapped one.
export type ParticipationOverview = AccountParticipationOverview[]
export type ParticipationOverviewResponse = {
    accounts: AccountParticipationOverview[]
}

/**
 * Gets an overview of participation for accounts.
 * See #StakingOverview interface for more details.
 *
 * @method getParticipationOverview
 *
 * @param {Bridge} bridge
 * @param {CommunicationIds} __ids
 *
 * @returns {Promise<string>}
 */
 export function getParticipationOverview(bridge: Bridge, __ids: CommunicationIds): Promise<string> {
    return bridge({
        actorId: __ids.actorId,
        id: __ids.messageId,
        cmd: 'GetParticipationOverview',
    })
}

/**
 * Gets participation event details
 *
 * @method getParticipationEvents
 *
 * @param {Bridge} bridge
 * @param {CommunicationIds} __ids
 *
 * @returns {Promise<string>}
 */
 export function getParticipationEvents(bridge: Bridge, __ids: CommunicationIds): Promise<string> {
    return bridge({
        actorId: __ids.actorId,
        id: __ids.messageId,
        cmd: 'GetParticipationEvents',
    })
}

/**
 * Participate in event(s)
 *
 * @method getParticipationEvents
 *
 * @param {Bridge} bridge
 * @param {CommunicationIds} __ids
 * @param {string} accountId
 * @param {Participation[]} participations
 *
 * @returns {Promise<string>}
 */
 export function participate(bridge: Bridge, __ids: CommunicationIds, accountId: string, participations: Participation[]): Promise<string> {
    return bridge({
        actorId: __ids.actorId,
        id: __ids.messageId,
        cmd: 'Participate',
        payload: {
            account_identifier: accountId,
            participations
        }
    })
}

/**
 * Stop participating in event(s)
 *
 * @method stopParticipating
 *
 * @param {Bridge} bridge
 * @param {CommunicationIds} __ids
 * @param {string} accountId
 * @param {string[]} eventIds
 *
 * @returns {Promise<string>}
 */
 export function stopParticipating(bridge: Bridge, __ids: CommunicationIds, accountId: string, eventIds: string[]): Promise<string> {
    return bridge({
        actorId: __ids.actorId,
        id: __ids.messageId,
        cmd: 'StopParticipating',
        payload: {
            account_identifier: accountId,
            event_ids: eventIds
        }
    })
}

/**
 * Participate in event(s) with additional funds
 *
 * @method participateWithRemainingFunds
 *
 * @param {Bridge} bridge
 * @param {CommunicationIds} __ids
 * @param {string} accountId
 * @param {Participation[]} eventIds
 *
 * @returns {Promise<string>}
 */
 export function participateWithRemainingFunds(bridge: Bridge, __ids: CommunicationIds, accountId: string, participations: Participation[]): Promise<string> {
    return bridge({
        actorId: __ids.actorId,
        id: __ids.messageId,
        cmd: 'ParticipateWithRemainingFunds',
        payload: {
            account_identifier: accountId,
            participations
        }
    })
}