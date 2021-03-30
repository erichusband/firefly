import type { ErrorTypes as ValidatorErrorTypes } from './validator'
import type { ErrorType } from './typings/events'
import { persistent } from 'shared/lib/helpers'

const errorMessages: {
    [key in keyof typeof ErrorType]: string;
} = {
    'IoError': 'error.global.generic',
    'JsonError': 'error.global.generic',
    'ClientError': 'error.global.generic',
    'Panic': 'error.global.generic',
    // Account
    'LatestAccountIsEmpty': 'error.account.empty',
    'AccountNotEmpty': 'error.account.notEmpty',
    'AccountInitialiseRequiredField': 'error.global.generic',
    'CannotUseIndexIdentifier': 'error.global.generic',
    'AccountAliasAlreadyExists': 'error.account.duplicate',
    'InvalidBackupFile': 'error.backup.invalid',
    'InvalidBackupDestination': 'error.backup.destination',
    'InsufficientFunds': 'error.send.amountTooHigh',
    'MnemonicEncode': 'error.global.generic',
    'InvalidMnemonic': 'error.backup.mnemonic',
    // Address
    'InvalidAddress': 'error.send.wrongAddressFormat',
    'InvalidAddressLength': 'error.send.generic',
    'InvalidRemainderValueAddress': 'error.global.generic',
    'AddressBuildRequiredField': 'error.global.generic',
    // Message
    'MessageNotFound': 'error.global.generic',
    'InvalidMessageIdLength': 'error.global.generic',
    'InvalidMessageId': 'error.global.generic',
    'InvalidOutputKind': 'error.global.generic',
    'InvalidTransactionId': 'error.global.generic',
    // Stronghold
    'StrongholdError': 'error.global.generic',
    // Database
    'StorageDoesntExist': 'error.global.generic',
    'Storage': 'error.global.generic',
    'StorageAdapterNotDefined': 'error.global.generic',
    'StorageExists': 'error.global.generic',
    'StorageAdapterNotSet': 'error.global.generic',
    'StorageIsEncrypted': 'error.global.generic',
    'RecordDecrypt': 'error.global.generic',
    'RecordEncrypt': 'error.global.generic',
    'RecordNotFound': 'error.global.generic',
    // Bee (https://github.com/iotaledger/bee)
    'BeeMessage': 'error.global.generic',
    // Nodes
    'UrlError': 'error.node.invalid',
    'NodesNotSynced': 'error.node.unsynced',
    // Ledger
    'LedgerMiscError': 'error.global.generic',
    'LedgerDongleLocked': 'error.global.generic',
    'LedgerDeniedByUser': 'error.global.generic',
    'LedgerDeviceNotFound': 'error.global.generic',
    'LedgerEssenceTooLarge': 'error.global.generic',
    // Dust output
    'DustError': 'error.global.generic',
}

export const getErrorMessage = (type: ErrorType | ValidatorErrorTypes): string => {
    const message = errorMessages?.[type]
    return message ? message : 'error.global.generic'
}

/**
 * Error interface
 */
interface Error {
    time: number
    type: ErrorType | ValidatorErrorTypes,
    message: string
}

export const errorLog = persistent<Error[]>('errorLog', [])