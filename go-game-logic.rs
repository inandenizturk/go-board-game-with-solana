use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey,
    program_error::ProgramError, msg, program_pack::{Pack, Sealed},
};

#[derive(Debug)]
pub struct GoGame {
    board: [[u8; 9]; 9],  // 9x9 Go board
    current_turn: u8,     // 1 for black, 2 for white
}

impl Sealed for GoGame {}

impl Pack for GoGame {
    const LEN: usize = 82; // 81 for board + 1 for turn

    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let mut board = [[0u8; 9]; 9];
        for row in 0..9 {
            for col in 0..9 {
                board[row][col] = src[row * 9 + col];
            }
        }
        let current_turn = src[81];
        Ok(GoGame { board, current_turn })
    }

    fn pack_into_slice(&self, dst: &mut [u8]) {
        for row in 0..9 {
            for col in 0..9 {
                dst[row * 9 + col] = self.board[row][col];
            }
        }
        dst[81] = self.current_turn;
    }
}

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account = &accounts[0];
    let mut game_data = GoGame::unpack(&account.data.borrow())?;

    // Parse the instruction data: row, col, and player move
    let row = instruction_data[0] as usize;
    let col = instruction_data[1] as usize;
    let player = instruction_data[2];

    // Check if it's the player's turn and if the move is valid
    if game_data.current_turn != player {
        msg!("It's not your turn!");
        return Err(ProgramError::InvalidInstructionData);
    }

    if game_data.board[row][col] != 0 {
        msg!("Invalid move, spot already taken.");
        return Err(ProgramError::InvalidInstructionData);
    }

    // Place the stone and toggle the turn
    game_data.board[row][col] = player;
    game_data.current_turn = if player == 1 { 2 } else { 1 };

    // Save the updated game state
    GoGame::pack(game_data, &mut account.data.borrow_mut())?;
    Ok(())
}

entrypoint!(process_instruction);
